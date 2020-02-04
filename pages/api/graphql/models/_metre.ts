import {Metre, FilterInput, MetreSortBy} from '../_gen-types';
import sanity from './_sanity';

export async function findMany(
  filter?: FilterInput,
  sort?: MetreSortBy,
  skip = 0,
  limit = 10
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

  query = query.concat([
    '{_id, metre, "tunes": *[_type=="tune" && references(^._id)]{_id,title}}'
  ]);

  return sanity.fetch(query.join('|'), {filter: `${filter.textContains}*`});
}
