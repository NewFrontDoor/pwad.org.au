import nanoid from 'nanoid';
import {User, ShortList} from '../_gen-types';
import sanity from '../../../../lib/sanity';

export async function getById(id: string): Promise<User> {
  return sanity.fetch(
    `*[_type == "user" && _id == $id][0]{
      _id,
      name,
      email,
      "role": permission.role,
      "shortlist":shortlist.hymns[]->{_id,_type,title,hymnNumber}
  }`,
    {id}
  );
}

export async function findOrCreate(
  user: Record<string, string>
): Promise<User> {
  const result = await sanity.fetch(
    `*[_type == "user" && googleProviderId == $googleProviderId][0]{
      _id,
      name,
      email,
      "role": permission.role,
      "shortlist":shortlist.hymns[]->{_id,_type,title,hymnNumber}
  }`,
    {googleProviderId: user.sub}
  );

  if (isEmptyObject(result)) {
    return sanity.create({
      _type: 'user',
      name: {
        first: user.given_name,
        last: user.family_name
      },
      email: user.email,
      googleProviderId: user.sub,
      permission: {
        role: 'public'
      }
    });
  }

  return result;
}

export async function addShortListItem(
  id: string,
  hymnId: string
): Promise<ShortList[]> {
  await sanity
    .patch(id)
    .setIfMissing({shortlist: {hymns: []}})
    .append('shortlist.hymns', [
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
      .setIfMissing({shortlist: {hymns: []}})
      .insert('replace', `shortlist.hymns[${hymnIndex}]`, [])
      .commit();
  }

  const {shortlist} = await getById(id);
  return shortlist;
}

function isEmptyObject(obj: object): boolean {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}
