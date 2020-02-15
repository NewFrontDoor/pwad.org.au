import {PageContent} from '../gen-types';
import sanity from './sanity';

export async function getBySlug(slug: string): Promise<PageContent> {
  return sanity.fetch(
    ['*']
      .concat([
        '[_type=="pageContent" && slug.current==$slug][0]',
        `{
            _id,
            title,
            hasToc,
            "slug": slug.current,
            content[] {
              ...,
              markDefs[] {
                ...,_type == 'internalLink' => {
                  reference-> {
                    _id,_type
                  }
                }
              },
              "asset": asset->
            }
          }`
      ])
      .join('|'),
    {slug}
  );
}
