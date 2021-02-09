import assert from 'assert';
import Stripe from 'stripe';

const secretToken = process.env.STRIPE_SECRET_TOKEN;

assert(secretToken, 'Stripe Secret Token must be set');

const stripe = new Stripe(secretToken, {
  apiVersion: '2020-08-27',
  typescript: true
});

export default stripe;
