import {Metre, FilterInput, KeywordSortBy} from '../gen-types';
import sanity from './sanity';

export async function findMany(
  filter?: FilterInput,
  sort?: KeywordSortBy,
  skip = 0,
  limit = 10
): Promise<Metre[]> {
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

  console.log(query.join('|'));

  return sanity.fetch(query.join('|'), {filter: `${filter.textContains}*`});
}
