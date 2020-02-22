import stripe from '../../stripe';
import {User, StripeCheckoutSession} from '../gen-types';

export async function createCheckoutSession(
  user: User,
  host: URL
): Promise<StripeCheckoutSession> {
  const successUrl = new URL('/api/callback/payment-success', host);

  const cancelUrl = new URL('/my-account', host);

  const session = await stripe.checkout.sessions.create({
    customer: user.stripeCustomerId,
    success_url: successUrl.href,
    cancel_url: cancelUrl.href,
    payment_method_types: ['card'],
    subscription_data: {
      items: [{plan: 'plan_GkygZGTlUFPtzV', quantity: 1}]
    }
  });

  return {
    sessionId: session.id
  };
}
