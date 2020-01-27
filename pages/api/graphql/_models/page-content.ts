import {PageContent} from '../_gen-types';
import sanity from '../../../../lib/sanity';

export async function getById(pageId: string): Promise<PageContent> {
  return sanity.fetch(
    ['*']
      .concat([
        '[_type=="pageContent" && _id==$pageId][0]',
        `{
            _id,title,content[] {
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
