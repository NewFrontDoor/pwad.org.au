import {Keyword} from './_types';
import sanity from '../lib/sanity';

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

type FilterInput = {
  id?: string;
  slug?: string;
  search?: string;
  textContains?: string;
};

export enum KeywordSortBy {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

export async function findMany(
  filter?: FilterInput,
  sort?: KeywordSortBy,
  skip = 0,
  limit = 20
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
