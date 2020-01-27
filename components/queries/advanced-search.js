import gql from 'graphql-tag';

export default gql`
  query listAll(
    $title: String
    $tunes: [String]
    $occasion: String
    $keywords: [String]
    $book: EnumHymnBook
  ) {
    hymnMany(
      filter: {
        text_contains: $title
        book: $book
        occasion: $occasion
        keywords: $keywords
        _operators: {tune: {in: $tunes}}
      }
    ) {
      _id
      title
      score
      lyrics {
        md(truncate: 60)
      }
      keywords(limit: 3) {
        _id
        name
      }
    }
    prayerMany(filter: {text_contains: $title, keywords: $keywords}) {
      _id
      title
      score
      content {
        md(truncate: 60)
      }
      keywords(limit: 3) {
        _id
        name
      }
    }
    liturgyMany(filter: {text_contains: $title, keywords: $keywords}) {
      _id
      title
      score
      content {
        md(truncate: 60)
      }
      keywords(limit: 3) {
        _id
        name
      }
    }
  }
`;
