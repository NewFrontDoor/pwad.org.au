import {buffer} from 'micro';
import Stripe from 'stripe';
import {ManagementClient} from 'auth0';

const stripe = new Stripe(process.env.STRIPE_SECRET_TOKEN, {
  apiVersion: '2019-12-03',
  typescript: true
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_TOKEN;

const management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'read:users update:users'
});

type Session = Stripe.Event.Data.Object & {
  customer_email?: string;
  payment_intent?: string;
};

async function handleCheckoutSession(session: Session): Promise<void> {
  const {customer_email: email, payment_intent: paymentIntent} = session;

  try {
    if (email) {
      console.log('handleCheckout for', {email});
      const user = await management.getUsersByEmail(email);

      await management.updateUserMetadata(user, {
        paymentIntent
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function webhook(req, res) {
  const signature = req.headers['stripe-signature'];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      signature,
      endpointSecret
    );
  } catch (error) {
    console.error(error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    handleCheckoutSession(session);
  }

  res.json({received: true});
}

export const config = {
  api: {
    bodyParser: false
  }
};

export default webhook;
