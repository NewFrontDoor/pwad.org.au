const stripeSDK = require('stripe');
const keystone = require('keystone');
const config = require('config');

const {Router, raw} = require('express');

const router = new Router();
const stripe = stripeSDK(config.get('STRIPE_SECRET_TOKEN'));
const endpointSecret = config.get('STRIPE_WEBHOOK_SECRET_TOKEN');

async function handleCheckoutSession(session) {
  const {customer_email: email, payment_intent: paymentIntent} = session;
  const User = keystone.list('User').model;
  const Payment = keystone.list('Payment').model;
  const user = await User.findOne({email});
  await new Payment({
    user,
    paymentIntent
  }).save();
}

router.post('/', raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
  } catch (error) {
    req.log.error(error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    handleCheckoutSession(session);
  }

  res.json({received: true});
});

module.exports = router;
