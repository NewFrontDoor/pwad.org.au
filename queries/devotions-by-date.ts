import sanity from "../lib/sanity";
import { DevotionContent } from "./_types";

export async function getByDevotionsByDate(
  date: string
): Promise<DevotionContent> {
  return sanity.fetch(
    ["*"]
      .concat([
        '[_type=="devotionContent" && date==$date]',
        `{
            _id,
            _type,
            title,
            date,
            "slug": '/devotion/' + slug.current,
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
          }| order(title asc)`,
      ])
      .join("|"),
    { date }
  );
}
