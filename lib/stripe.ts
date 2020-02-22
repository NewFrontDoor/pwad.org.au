import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_TOKEN, {
  apiVersion: '2019-12-03',
  typescript: true
});

export default stripe;
