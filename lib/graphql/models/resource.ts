import {Ability} from '@casl/ability';
import {SearchResult, Main, MenuItem} from '../gen-types';
import sanity from '../../sanity';

const allResourcesQuery = ['*']
  .concat([
    '[_type in ["hymn", "prayer", "liturgy"] && (title match $search || keywords[]->name match $search)]',
    `{
      _id, _type, title, lyrics, hymnNumber, content[0..1], keywords[]->{_id, name}
    }`
  ])
  .join('|');

const freeResourcesQuery = ['*']
  .concat([
    '[_type in ["prayer", "liturgy"] && (title match $search || keywords[]->name match $search)]',
    `{
        _id, _type, title, lyrics, content[0..1], keywords[]->{_id, name}
      }`
  ])
  .join('|');

async function searchAllResources(search: string): Promise<SearchResult[]> {
  return sanity.fetch(allResourcesQuery, {search});
}

async function searchFreeResources(search: string): Promise<SearchResult[]> {
  return sanity.fetch(freeResourcesQuery, {search});
}

export async function textSearch(
  ability: Ability,
  search: string
): Promise<SearchResult[]> {
  if (ability.can('read', 'Hymn')) {
    return searchAllResources(`${search}*`);
  }

  return searchFreeResources(`${search}*`);
}

export async function main(): Promise<Main> {
  return sanity.fetch(
    ['*']
      .concat([
        '[_type == "main"][0]',
        `{
          _type,
          blurb,
          heading,
          subheading,
          "menuItems":menuitems[] {
            ...,
            _type,
            childpages[]{
              "_id": childPage->_id,
              _type,
              alternateText,
              childPage->{
                _id,
                _type,
                "slug": slug.current,
                title,
                name,
                url
              }
            }
          }
        }`
      ])
      .join('|')
  );
}

export async function menuItems(): Promise<MenuItem[]> {
  return sanity.fetch(
    ['*']
      .concat([
        '[_type == "main"]',
        `[0].menuitems[] {
          ...,
          _type,
          childpages[]{
            "_id": childPage->_id,
            _type,
            alternateText,
            childPage->{
              _id,
              _type,
              title,
              name,
              url
            }
          }
        }`
      ])
      .join('|')
  );
}
