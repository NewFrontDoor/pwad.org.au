import {Maybe, Metre, FilterInput, MetreSortBy} from '../gen-types';
import sanity from '../../sanity';

export async function findMany(
  filter?: Maybe<FilterInput>,
  sort?: Maybe<MetreSortBy>,
  skip = 0,
  limit = 20
): Promise<Metre[]> {
  let query = ['*'].concat('[_type=="metre"]');

  if (sort === MetreSortBy.MetreAsc) {
    query = query.concat('order(metre asc)');
  }

  if (sort === MetreSortBy.MetreDesc) {
    query = query.concat('order(metre desc)');
  }

  query = query.concat([`[${skip}...${skip + limit}]`]);

  if (filter) {
    query = query.concat(['[metre match $filter]']);
  }

  query = query.concat(['{_id, metre}']);

  return sanity.fetch(query.join('|'), {
    filter: `${filter?.textContains ?? ''}*`
  });
}
