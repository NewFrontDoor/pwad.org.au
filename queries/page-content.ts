import sanity from '../lib/sanity';
import {PageContent} from './_types';

export async function getBySlug(slug: string): Promise<PageContent> {
  return sanity.fetch(
    ['*']
      .concat([
        '[_type=="pageContent" && slug.current==$slug][0]',
        `{
            _id,
            _type,
            title,
            hasToc,
            "slug": slug.current,
            content[] {
              ...,
              markDefs[] {
                ...,
                _type == 'internalLink' => {
                  reference-> {
                    'slug': slug.current,
                    _id,
                    _type
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
