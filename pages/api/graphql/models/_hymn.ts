import {Hymn, SearchInput} from '../_gen-types';
import sanity from './_sanity';

export async function getById(id: string): Promise<Hymn> {
  return sanity.fetch(
    ['*']
      .concat([
        `[_type == "hymn" && _id == $id][0]{
    _id,
    author->{_id,name,dates},
    hymnNumber,
    content,
    title,
    book,
    chapter,
    chapterVerse,
    tune->{
      title,metre->{metre},
      musicCopyright->{name},
      composer->{_id,name,dates}
    },
    wordsCopyright->{name},
  }`
      ])
      .join('|'),
    {
      id
    }
  );
}

export async function search({
  book,
  keywords,
  occasion,
  textContains,
  _operators
}: SearchInput): Promise<Hymn[]> {
  const variables: Record<string, unknown> = {};
  let query = ['*'].concat(['[_type == "hymn"]']);

  if (book) {
    query = query.concat(`[book == "${book}"]`);
  }

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
