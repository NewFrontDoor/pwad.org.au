import {Metre} from './_types';
import sanity from '../lib/sanity';

type FilterInput = {
  id?: string;
  slug?: string;
  search?: string;
  textContains?: string;
};

export enum MetreSortBy {
  MetreAsc = 'metre_ASC',
  MetreDesc = 'metre_DESC'
}

export async function findMany(
  filter?: FilterInput,
  sort?: MetreSortBy,
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
