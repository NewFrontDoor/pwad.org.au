import {User, SearchResult, Main, MenuItem} from '../_gen-types';
import sanity from './sanity';

const allResourcesQuery = ['*']
  .concat([
    `[_type in ["hymn", "prayer", "liturgy"] && (title match $search || keywords[]->name match $search)][0...10]{
      _id, _type, title, lyrics, content[0..1], keywords[]->{_id, name}
    }`,
    '[!(_id in path("drafts.**"))]'
  ])
  .join('|');

const freeResourcesQuery = ['*']
  .concat([
    `[_type in ["prayer", "liturgy"] && (title match $search || keywords[]->name match $search)][0...10]{
        _id, _type, title, lyrics, content[0..1], keywords[]->{_id, name}
      }`,
    '[!(_id in path("drafts.**"))]'
  ])
  .join('|');

async function searchAllResources(search: string): Promise<SearchResult[]> {
  return sanity.fetch(allResourcesQuery, {search});
}

async function searchFreeResources(search: string): Promise<SearchResult[]> {
  return sanity.fetch(freeResourcesQuery, {search});
}

export async function textSearch(
  user: User,
  search: string
): Promise<SearchResult[]> {
  if (user) {
    return searchAllResources(search);
  }

  return searchFreeResources(search);
}

export async function main(): Promise<Main> {
  return sanity.fetch(
    ['*']
      .concat([
        '[_type == "main"][0]',
        '[!(_id in path("drafts.**"))]',
        '{_type,blurb,heading,subheading,"menuItems":menuitems[] {...,_type,childpages[]->{_type,_id,title}}}'
      ])
      .join('|')
  );
}

export async function menuItems(): Promise<MenuItem[]> {
  return sanity.fetch(
    ['*']
      .concat([
        '[_type == "main"]',
        '[!(_id in path("drafts.**"))]',
        '[0].menuitems[] {...,_type,childpages[]->{_type,_id,title}}'
      ])
      .join('|')
  );
}
