import {Author} from '../_gen-types';
import sanity from '../../../../lib/sanity';

export async function getById(id: string): Promise<Author[]> {
  return sanity.fetch(
    ['*']
      .concat([
        '[_type=="author" && _id==$id][0]',
        `{
          _id,
          _type,
          name,
          dates,
          "hymns": *[_type == "hymn" && author._ref==$id]{_id,_type,title,hymnNumber},
          "liturgies": *[_type == "liturgy" && author._ref==$id]{_id,_type,title}
        }`
      ])
      .join('|'),
    {id}
  );
}
