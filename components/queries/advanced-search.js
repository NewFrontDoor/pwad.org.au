import gql from 'graphql-tag';

export default gql`
  query listAll($title: String, $tunes: [MongoID], $book: EnumHymnBook) {
    hymnMany(
      filter: {
        text_contains: $title
        book: $book
        _operators: {tune: {in: $tunes}}
      }
    ) {
      _id
      title
      score
      lyrics {
        md(truncate: 120)
      }
    }
    prayerMany(filter: {text_contains: $title}) {
      _id
      title
      score
      content {
        md(truncate: 120)
      }
    }
    liturgyMany(filter: {text_contains: $title}) {
      _id
      title
      score
      content {
        md(truncate: 120)
      }
    }
  }
`;
