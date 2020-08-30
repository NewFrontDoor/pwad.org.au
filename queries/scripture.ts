import {Scripture} from './_types';
import sanity from '../lib/sanity';

export async function getById(id: string): Promise<Scripture> {
  return sanity.fetch(
    ['*']
      .concat([
        '[_type == "scripture" && _id == $id][0]',
        '{_id, _type, title, content}'
      ])
      .join('|'),
    {id}
  );
}
