import sanity from "../lib/sanity";
import { DevotionContent } from "./_types";

export async function getByRestrictedSlug(
  date: string
): Promise<DevotionContent> {
  return sanity.fetch(
    ["*"]
      .concat([
        '[_type=="devotionContent" && date==$date][0]',
        `{
            _id,
            _type,
            title,
            date,
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
    { date }
  );
}
