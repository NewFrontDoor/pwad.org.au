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
    return res.status(400).send(`Webhook Error: ${String(error.message)}`);
  }

  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object;

    await handleInvoicePaymentSucceeded(invoice as Stripe.Invoice);
  }

  res.json({received: true});
}

export const config = {
  api: {
    bodyParser: false
  }
};

export default webhook;
