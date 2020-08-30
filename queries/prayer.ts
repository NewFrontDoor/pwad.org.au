import {Prayer, SearchInput} from './_types';
import sanity from '../lib/sanity';

export async function getById(id: string): Promise<Prayer> {
  return sanity.fetch(
    ['*']
      .concat([
        '[_type == "prayer" && _id == $id][0]',
        '{_id, _type, title, author->{_id, name, dates}, content, keywords[]->{_id, name}, categories[]->{_id, name}}'
      ])
      .join('|'),
    {id}
  );
}

export async function search({
  keyword,
  occasion,
  textContains,
  _operators
}: SearchInput): Promise<Prayer[]> {
  const variables: Record<string, unknown> = {};
  let query = ['*'].concat(['[_type == "prayer"]']);

  if (textContains) {
    variables.search = `${textContains}*`;
    query = query.concat([
      '[(title match $search || content match $search || keywords[]->name match $search)]'
    ]);
  }

  if (occasion) {
    variables.occasion = occasion;
    query = query.concat(['[occasion == $occasion]']);
  }

  if (keyword) {
    variables.keyword = keyword;
    query = query.concat(['[references($keyword)]']);
  }

  query = query.concat([
    '{_id, _type, title, content[0...1], keywords[]->{_id,name}}'
  ]);

  return sanity.fetch(query.join('|'), variables);
}
