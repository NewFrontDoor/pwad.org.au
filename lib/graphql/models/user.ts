import nanoid from 'nanoid';
import {ManagementClient, PasswordChangeTicketResponse} from 'auth0';
import isAfter from 'date-fns/isAfter';
import {User, ShortList, InvoiceStatus} from '../gen-types';
import sanity from '../../sanity';

const management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'create:user_tickets'
});

export async function getById(id: string): Promise<User> {
  return sanity.fetch(
    `*[_type == "user" && _id == $id][0]{
      _id,
      name,
      email,
      invoiceStatus,
      periodEndDate,
      stripeCustomerId,
      "role": permission.role,
      shortlist[]->{_id,_type,title,hymnNumber}
  }`,
    {id}
  );
}

export async function findOrCreate(
  user: Record<string, string>
): Promise<User> {
  let result = await sanity.fetch(
    `*[_type == "user" && email == $email][0]{
      _id,
      name,
      email,
      invoiceStatus,
      periodEndDate,
      stripeCustomerId,
      "role": permission.role,
      shortlist[]->{_id,_type,title,hymnNumber}
  }`,
    {email: user.email}
  );

  if (isEmptyObject(result)) {
    result = sanity.createIfNotExists({
      _id: nanoid(),
      _type: 'user',
      name: {
        first: user.given_name,
        last: user.family_name
      },
      email: user.email,
      permission: {
        role: 'public'
      }
    });
  }

  result.hasPaidAccount = hasPaidAccount(result);

  return result;
}

type SubscriptionStatus = {
  email: string;
  invoiceStatus: string;
  stripeCustomerId: string;
  periodEndDate: Date;
};

export async function updateSubscriptionStatus({
  email,
  invoiceStatus,
  stripeCustomerId,
  periodEndDate
}: SubscriptionStatus): Promise<void> {
  const {_id} = await sanity.fetch(
    `*[_type == "user" && email == $email][0]{_id}`,
    {
      email
    }
  );

  await sanity
    .patch(_id)
    .set({
      stripeCustomerId,
      invoiceStatus,
      periodEndDate: periodEndDate.toISOString()
    })
    .commit();
}

export async function changePassword(
  user: User,
  host: URL
): Promise<PasswordChangeTicketResponse> {
  const resultUrl = new URL('/my-account', host);
  return management.createPasswordChangeTicket({
    email: user.email,
    result_url: resultUrl.href,
    connection_id: 'con_9pRAt1nFWr5rkyyK'
  });
}

export async function addShortListItem(
  id: string,
  hymnId: string
): Promise<ShortList[]> {
  await sanity
    .patch(id)
    .setIfMissing({shortlist: []})
    .append('shortlist', [
      {
        _key: nanoid(),
        _ref: hymnId,
        _type: 'reference'
      }
    ])
    .commit();

  const {shortlist} = await getById(id);

  return shortlist;
}

export async function removeShortListItem(
  id: string,
  hymnIndex: number
): Promise<ShortList[]> {
  if (hymnIndex >= 0) {
    await sanity
      .patch(id)
      .setIfMissing({shortlist: []})
      .insert('replace', `shortlist[${hymnIndex}]`, [])
      .commit();
  }

  const {shortlist} = await getById(id);
  return shortlist;
}

function hasPaidAccount(user: User): boolean {
  const periodEndDate = new Date(user.periodEndDate);
  const hasPaidInvoice = user.invoiceStatus === InvoiceStatus.Paid;
  const isWithinInvoicePeriod = isAfter(periodEndDate, Date.now());

  return hasPaidInvoice && isWithinInvoicePeriod;
}

function isEmptyObject(obj: object): boolean {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}
