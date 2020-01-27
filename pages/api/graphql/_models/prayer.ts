import {Prayer} from '../_gen-types';
import sanity from './sanity';

export async function getById(id: string): Promise<Prayer> {
  return sanity.fetch(
    ['*']
      .concat([
        '[_type == "prayer" && _id == $id]',
        '[!(_id in path("drafts.**"))][0]',
        '{_id, _type, title, author, content, keywords[]->{_id, name}, categories[]->{_id, name}}'
      ])
      .join('|'),
    {id}
  );
}
