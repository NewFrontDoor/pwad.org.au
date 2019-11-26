import {useFetch} from '../use-sanity';

const query = ['*']
  .concat([
    `[_type in ["hymn", "prayer", "liturgy"]][0...10]{
      _id, _type, title, lyrics, content, keywords[]->{_id, name}
    }`,
    '[!(_id in path("drafts.**"))]'
  ])
  .join('|');

export default function useSearchQuery(params) {
  const [result] = useFetch(query, params);

  return result;
}
