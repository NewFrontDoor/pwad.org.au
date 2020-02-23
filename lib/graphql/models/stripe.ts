import Stripe from 'stripe';
import fromUnixTime from 'date-fns/fromUnixTime';
import stripe from '../../stripe';
import {User, StripeCheckoutSession, StripeSubscription} from '../gen-types';

export async function createCheckoutSession(
  user: User,
  host: URL
): Promise<StripeCheckoutSession> {
  const successUrl = new URL('/api/callback/payment-success', host);

  const cancelUrl = new URL('/my-account', host);

  const customer = user.stripeCustomerId;
  let customer_email: string;

  if (typeof customer === 'undefined') {
    customer_email = user.email;
  }

  const session = await stripe.checkout.sessions.create({
    customer,
    customer_email,
    success_url: successUrl.href,
    cancel_url: cancelUrl.href,
    payment_method_types: ['card'],
    mode: 'subscription',
    subscription_data: {
      items: [{plan: 'plan_GkygZGTlUFPtzV', quantity: 1}]
    }
  });

  return {
    sessionId: session.id
  };
}

export async function getUserSubscription(
  user: User
): Promise<StripeSubscription> {
  const subscription = await findCurrentSubscription(user);
  return subscriptionResponse(subscription);
}

export async function cancelSubscription(
  user: User
): Promise<StripeSubscription> {
  const subscription = await findCurrentSubscription(user);

  const deletedSubscription = await stripe.subscriptions.del(subscription.id);

  return subscriptionResponse(deletedSubscription);
}

function subscriptionResponse(
  subscription: Stripe.Subscription
): StripeSubscription {
  return {
    id: subscription.id,
    plan: subscription.plan.nickname,
    status: subscription.status,
    startDate: fromUnixTime(subscription.start_date),
    daysUntilDue: subscription.days_until_due,
    cancelAt: fromUnixTime(subscription.cancel_at),
    canceledAt: fromUnixTime(subscription.canceled_at),
    currentPeriodEnd: fromUnixTime(subscription.current_period_end)
  };
}

async function findCurrentSubscription(
  user: User
): Promise<Stripe.Subscription> {
  const customer = await stripe.customers.retrieve(user.stripeCustomerId, {
    expand: ['subscription']
  });

  assertCustomer(customer);

  // NOTE: Assuming the current subscription is the first active subscription
  return customer.subscriptions.data.find(
    subscription => subscription.status === 'active'
  );
}

function assertCustomer(
  customer: Stripe.Customer | Stripe.DeletedCustomer
): asserts customer is Stripe.Customer {
  if (customer.deleted) {
    throw new Error(`customer ${String(customer.id)} is deleted`);
  }
}
