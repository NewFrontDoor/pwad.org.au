import {Hymn, SearchInput} from '../gen-types';
import sanity from './sanity';

export async function getById(id: string): Promise<Hymn> {
  return sanity.fetch(
    ['*']
      .concat([
        `[_type == "hymn" && _id == $id][0]{
    _id,
    author->{_id,name,dates},
    file->{
      _id,
      _type,
      name,
      size,
      url
    },
    hymnNumber,
    content,
    title,
    book,
    chapter,
    chapterVerse,
    tune->{
      title,
      metre->{
        _id,
        _type,
        metre
      },
      musicCopyright->{
        _id,
        _type,
        name
      },
      composer->{
        _id,
        _type,
        name,
        dates
      },
      file->{
        _id,
        _type,
        name,
        size,
        url
      }
    },
    wordsCopyright->{
      name
    },
    "alternateTunes": *[_type=="tune" && references(^.tune->metre._ref) && _id!=^.tune->_id]{
      _id,
      _type,
      title,
      file->{
        _id,
        _type,
        name,
        size,
        url
      }
    }
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
  tune,
  keyword,
  occasion,
  textContains,
  _operators
}: SearchInput): Promise<Hymn[]> {
  const variables: Record<string, unknown> = {};
  let query = ['*'].concat(['[_type == "hymn"]']);

  if (book) {
    variables.book = book;
    query = query.concat('[book == $book]');
  }

  if (textContains) {
    variables.search = `${textContains}*`;
    query = query.concat([
      '[(title match $search || content match $search || keywords[]->name match $search)]'
    ]);
  }

  if (occasion) {
    variables.occasion = occasion;
    query = query.concat(['[references($occasion)]']);
  }

  if (tune) {
    variables.tune = tune;
    query = query.concat(['[references($tune)]']);
  }

  if (keyword) {
    variables.keyword = keyword;
    query = query.concat(['[references($keyword)]']);
  }

  if (_operators?.metre?.in) {
    variables.metres = _operators.metre.in;
    query = query.concat(['[tune->metre._ref in $metres]']);
  }

  query = query.concat([
    '{_id, _type, title, content[0...1], keywords[]->{_id,name}}'
  ]);

  return sanity.fetch(query.join('|'), variables);
}
