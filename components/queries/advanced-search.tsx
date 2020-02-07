import gql from 'graphql-tag';

export default gql`
  query advancedSearch(
    $title: String
    $tune: String
    $metres: [String]
    $occasion: String
    $keywords: [String]
    $book: EnumHymnBook
  ) {
    search(
      filter: {
        textContains: $title
        book: $book
        tune: $tune
        occasion: $occasion
        keywords: $keywords
        _operators: {metre: {in: $metres}}
      }
    ) {
      ... on Document {
        _id
        _type
      }
      ... on Hymn {
        title
        content
        keywords {
          _id
          name
        }
      }
      ... on Prayer {
        title
        content
        keywords {
          _id
          name
        }
      }
      ... on Liturgy {
        title
        content
        keywords {
          _id
          name
        }
      }
    }
  }
`;
