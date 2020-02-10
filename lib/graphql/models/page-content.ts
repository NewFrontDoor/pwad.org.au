import {PageContent} from '../gen-types';
import sanity from './sanity';

export async function getById(pageId: string): Promise<PageContent> {
  return sanity.fetch(
    ['*']
      .concat([
        '[_type=="pageContent" && _id==$pageId][0]',
        `{
            _id,
            title,
            hasToc,
            "slug": slug.current,
            content[] {
              ...,markDefs[] {
                ...,_type == 'internalLink' => {
                  reference-> {
                    _id,_type
                  }
                }
              }
            }
          }`
      ])
      .join('|'),
    {pageId}
  );
}
