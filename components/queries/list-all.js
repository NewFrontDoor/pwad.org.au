import gql from 'graphql-tag';

export default gql`
  query listAll(
    $title: String
    $hymnMetres: [MongoID]
    $tune: MongoID
    $book: EnumHymnBook
  ) {
    hymnMany(
      filter: {
        title_contains: $title
        includes_metre: $hymnMetres
        book: $book
        tune: $tune
      }
    ) {
      _id
      title
      lyrics {
        md(truncate: 120)
      }
    }
    scriptureMany(filter: {title_contains: $title}) {
      _id
      title
      translation
      content {
        md(truncate: 120)
      }
    }
  }
`;
