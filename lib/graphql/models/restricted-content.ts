import { RestrictedContent } from "../gen-types";
import sanity from "../../sanity";

export async function getByRestrictedSlug(
  slug: string
): Promise<RestrictedContent> {
  return sanity.fetch(
    ["*"]
      .concat([
        '[_type=="restrictedContent" && slug.current==$slug][0]',
        `{
            _id,
            title,
            hasToc,
            "slug": slug.current,
            content[] {
              ...,
              markDefs[] {
                ...,
                _type == 'internalLink' => {
                  reference-> {
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
