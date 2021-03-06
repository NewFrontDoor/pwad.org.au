import {Tune, FilterInput, TuneSortBy} from './_types';
import sanity from '../lib/sanity';

export async function findMany(
  filter?: FilterInput,
  sort?: TuneSortBy,
  skip = 0,
  limit = 20
): Promise<Tune[]> {
  let query = ['*'].concat('[_type=="tune"]');

  if (sort === TuneSortBy.TitleAsc) {
    query = query.concat('order(title asc)');
  }

  if (sort === TuneSortBy.TitleDesc) {
    query = query.concat('order(title desc)');
  }

  query = query.concat([`[${skip}...${skip + limit}]`]);

  if (filter) {
    query = query.concat(['[title match $filter]']);
  }

  query = query.concat(['{_id, title}']);

  return sanity.fetch(query.join('|'), {
    filter: `${filter?.textContains ?? ''}*`
  });
}
