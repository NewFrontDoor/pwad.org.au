import sanity from "../lib/sanity";
import { DevotionContent } from "./_types";

export async function getByDevotionSlug(
  slug: string
): Promise<DevotionContent> {
  return sanity.fetch(
    ["*"]
      .concat([
        '[_type=="devotionContent" && slug.current==$slug][0]',
        `{
            _id,
            _type,
            title,
            date,
            slug,
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
          }`,
      ])
      .join("|"),
    { slug }
  );
}
