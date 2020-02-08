import {buffer} from 'micro';
import {NextApiRequest, NextApiResponse} from 'next';
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
  scope: 'read:users update:users update:users_app_metadata'
});

type Session = Stripe.Event.Data.Object & {
  customer_email?: string;
  payment_intent?: string;
};

async function handleCheckoutSession(session: Session): Promise<void> {
  const {customer_email: email, payment_intent: paymentIntent} = session;
  const [user] = await management.getUsersByEmail(email);

  await management.updateAppMetadata(
    {id: user.user_id},
    {
      paymentIntent
    }
  );
}

async function webhook(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const signature = req.headers['stripe-signature'];

  let event: Stripe.Event;

  try {
    const body = await buffer(req);

    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (error) {
    console.error(error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    await handleCheckoutSession(session);
  }

  res.json({received: true});
}

export const config = {
  api: {
    bodyParser: false
  }
};

export default webhook;
