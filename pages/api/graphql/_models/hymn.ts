import {Hymn} from '../_gen-types';
import sanity from '../../../../lib/sanity';

export async function getById(id: string): Promise<Hymn> {
  return sanity.fetch(
    ['*']
      .concat([
        `[_type == "hymn" && _id == $id][0]{
    author->{_id,name,dates},
    hymnNumber,
    content,
    scripture,
    title,
    tune->{title,metre->{metre},musicCopyright->{name},composer->{_id,name,dates}},
    wordsCopyright->{name},
  }`
      ])
      .join('|'),
    {
      id
    }
  );
}
