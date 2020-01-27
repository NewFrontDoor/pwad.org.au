import {Liturgy} from '../_gen-types';
import sanity from './sanity';

export async function getById(id: string): Promise<Liturgy> {
  return sanity.fetch(
    ['*']
      .concat([
        '[_type == "liturgy" && _id == $id]',
        '[!(_id in path("drafts.**"))][0]',
        '{_id, _type, title, files, author->{_id,name,dates}, content, keywords[]->{_id, name}, categories[]->{_id, name}}'
      ])
      .join('|'),
    {id}
  );
}
