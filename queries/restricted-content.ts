import sanity from "../lib/sanity";
import { RestrictedContent } from "./_types";

export async function getByRestrictedSlug(
  slug: string
): Promise<RestrictedContent> {
  return sanity.fetch(
    ["*"]
      .concat([
        '[_type=="restrictedContent" && slug.current==$slug][0]',
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
          }`,
      ])
      .join("|"),
    { slug }
  );
}
