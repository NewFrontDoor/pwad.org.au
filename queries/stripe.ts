import Stripe from 'stripe';
import fromUnixTime from 'date-fns/fromUnixTime';
import stripe from '../lib/stripe';
import {User, StripeCheckoutSession, StripeSubscription} from './_types';

/**
 * Creates a Stripe Checkout Session Id for users to access the Stripe checkout
 *
 * @param  user The current user
 * @param  host The current host
 * @return      The sessionId used for stripe.redirectToCheckout()
 */
export async function createCheckoutSession(
  user: User,
  host: URL
): Promise<StripeCheckoutSession> {
  const successUrl = new URL('/my-account', host);
  const cancelUrl = new URL('/my-account', host);

  const customer = user.stripeCustomerId;
  let customer_email: string;

  // New users won't have a Stripe Customer Id,
  // so we prefill their email address instead
  if (typeof customer === 'undefined') {
    customer_email = user.email;
  }

  // NOTE: accepts only one of customer, or customer_email and not both
  const session = await stripe.checkout.sessions.create({
    customer,
    customer_email,
    success_url: successUrl.href,
    cancel_url: cancelUrl.href,
    payment_method_types: ['card'],
    mode: 'subscription',
    subscription_data: {
      items: [{plan: 'plan_GkvSgThNOY4A5D', quantity: 1}]
    }
  });

  return {
    sessionId: session.id
  };
}

/**
 * Gets the current active subscription for the current user
 * @param  user The current user
 * @return      The subscription response
 */
export async function getUserSubscription(
  user: User
): Promise<StripeSubscription> {
  const subscription = await findCurrentSubscription(user);
  return subscriptionResponse(subscription);
}

/**
 * Sets the current active subscription for the current user
 * to cancel at the subscription period end date
 *
 * @param  user The current user
 * @return      The canceled subscription response
 */
export async function cancelSubscription(
  user: User
): Promise<StripeSubscription> {
  const subscription = await findCurrentSubscription(user);

  const canceledSubscription = await stripe.subscriptions.update(
    subscription.id,
    {
      cancel_at_period_end: true
    }
  );

  return subscriptionResponse(canceledSubscription);
}

/**
 * Maps a Stripe.Subscription into a StripeSubscription response for graphql
 * @param  subscription The Stripe.Subscription
 * @return              The StripeSubscription response
 */
function subscriptionResponse(
  subscription: Stripe.Subscription
): StripeSubscription {
  const [firstItem] = subscription.items.data;

  return {
    id: subscription.id,
    plan: firstItem.plan.nickname,
    status: subscription.status,
    startDate: fromUnixTime(subscription.start_date),
    cancelAt: fromUnixTime(subscription.cancel_at),
    canceledAt: fromUnixTime(subscription.canceled_at),
    currentPeriodEnd: fromUnixTime(subscription.current_period_end)
  };
}

/**
 * Finds the current active subscription for the current user
 * @param  user The current user
 * @return      The current active subscription
 */
async function findCurrentSubscription(
  user: User
): Promise<Stripe.Subscription> {
  const customer = await stripe.customers.retrieve(user.stripeCustomerId, {
    expand: ['subscription']
  });

  assertCustomer(customer);

  // NOTE: Assuming the current subscription is the first active subscription
  return customer.subscriptions.data.find(
    (subscription) => subscription.status === 'active'
  );
}

/**
 * Asserts the existance of Stripe.Customer
 *
 * Stripe can also return a Stripe.DeletedCustomer
 * This shouldn't happen, so we throw an exception
 *
 * @param  customer [description]
 * @return          [description]
 */
function assertCustomer(
  customer: Stripe.Customer | Stripe.DeletedCustomer
): asserts customer is Stripe.Customer {
  if (customer.deleted) {
    throw new Error(`customer ${String(customer.id)} is deleted`);
  }
}
