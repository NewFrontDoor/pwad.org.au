import {Keyword, FilterInput, KeywordSortBy} from '../gen-types';
import sanity from './sanity';

export async function getById(id: string): Promise<Keyword> {
  const query = ['*'].concat(
    '[_type=="keyword" && _id == $id ][0]',
    `{
    _id,
    _type,
    name,
    "hymns": *[_type == "hymn" && references(^._id)]{
      _id,_type,title,hymnNumber
    },
    "prayers": *[_type == "prayer" && references(^._id)]{
      _id,_type,title
    },
    "liturgies": *[_type == "ligurgy" && references(^._id)]{
      _id,_type,title
    }
  }`
  );

  return sanity.fetch(query.join('|'), {id});
}

export async function findMany(
  filter?: FilterInput,
  sort?: KeywordSortBy,
  skip = 0,
  limit = 10
): Promise<Keyword[]> {
  let query = ['*'].concat('[_type=="keyword"]');

  if (sort === KeywordSortBy.NameAsc) {
    query = query.concat('order(name asc)');
  }

  if (sort === KeywordSortBy.NameDesc) {
    query = query.concat('order(name desc)');
  }

  query = query.concat([`[${skip}...${skip + limit}]`]);

  if (filter) {
    query = query.concat(['[name match $filter]']);
  }

  query = query.concat(['{_id, name}']);

  return sanity.fetch(query.join('|'), {filter: `${filter.textContains}*`});
}
