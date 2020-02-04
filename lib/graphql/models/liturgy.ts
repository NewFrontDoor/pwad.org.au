import {Liturgy, SearchInput} from '../gen-types';
import sanity from './sanity';

export async function getById(id: string): Promise<Liturgy> {
  return sanity.fetch(
    ['*']
      .concat([
        '[_type == "liturgy" && _id == $id]',
        '[!(_id in path("drafts.**"))][0]',
        '{_id, _type, title, files, author->{_id,name,dates}, content, keywords[]->{_id, name}, categories[]->{_id, name}}'
      ])
      .join('|'),
    {id}
  );
}

export async function search({
  keywords,
  occasion,
  textContains,
  _operators
}: SearchInput): Promise<Liturgy[]> {
  const variables: Record<string, unknown> = {};
  let query = ['*'].concat(['[_type == "liturgy"]']);

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

  query = query.concat([
    '{_id, _type, title, content[0...1], keywords[]->{_id,name}}'
  ]);

  return sanity.fetch(query.join('|'), variables);
}
