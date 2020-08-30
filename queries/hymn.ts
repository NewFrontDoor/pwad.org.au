import sanity from '../lib/sanity';
import {Hymn, SearchInput} from './_types';

/**
 * Fetch Hymn from sanity
 *
 * @param  id Hymn Id
 * @return    Hymn
 */
export async function getById(id: string): Promise<Hymn> {
  return sanity.fetch(
    ['*']
      .concat([
        `[_type == "hymn" && _id == $id][0]{
    _id,
    _type,
    author->{_id,name,dates},
    files[]->{
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
      _id,
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
    copyright->{
      _id,
      name
    },
    "alternateTunes": *[_type=="tune" && references(^.tune->metre._ref) && _id!=^.tune->_id && !references('5d135379071bee16c4d7f422')]{
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

/**
 * Search for Hymns by Search Input
 *
 * @param  book         Book of the Bible
 * @param  tune         Tune Reference
 * @param  keyword      Keyword Reference
 * @param  occasion     Occasion Reference
 * @param  textContains Text search term, matchs Hymn title, content, and keyword names
 * @param  _operators   Matches on Tunes that are referenced by the list of metres
 * @return              Hymns as a list of Search Results
 */
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
    '{_id, _type, title, hymnNumber, content[0...1], keywords[]->{_id,name}}'
  ]);

  return sanity.fetch(query.join('|'), variables);
}
