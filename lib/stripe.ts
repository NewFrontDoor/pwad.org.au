import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_TOKEN, {
  apiVersion: '2020-03-02',
  typescript: true
});

export default stripe;
