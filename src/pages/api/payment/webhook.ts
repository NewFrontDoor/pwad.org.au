import {buffer} from 'micro';
import Stripe from 'stripe';
import {NextApiRequest, NextApiResponse} from 'next';
import fromUnixTime from 'date-fns/fromUnixTime';
import stripe from '../../../../lib/stripe';
import * as userModel from '../../../../lib/graphql/models/user';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_TOKEN;

async function handleInvoicePaymentSucceeded(
  invoice: Stripe.Invoice
): Promise<void> {
  const {customer_email: email, customer, lines, status} = invoice;

  // NOTE: we're assuming an invoice will only ever have a single line item
  const [{period}] = lines.data;

  const stripeCustomerId =
    typeof customer === 'string' ? customer : customer.id;

  const invoiceStatus = String(status);

  await userModel.updateSubscriptionStatus({
    email,
    stripeCustomerId,
    invoiceStatus,
    periodEndDate: fromUnixTime(period.end)
  });
}

async function webhook(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const signature = request.headers['stripe-signature'];

  let event: Stripe.Event;

  try {
    const body = await buffer(request);

    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (error) {
    console.error(error);
    return response.status(400).send(`Webhook Error: ${String(error.message)}`);
  }

  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object;

    await handleInvoicePaymentSucceeded(invoice as Stripe.Invoice);
  }

  response.json({received: true});
}

export const config = {
  api: {
    bodyParser: false
  }
};

export default webhook;
