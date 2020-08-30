import {gql} from '@apollo/client';

export default gql`
  query advancedSearch(
    $title: String
    $tune: String
    $metres: [String]
    $occasion: String
    $keyword: String
    $book: EnumHymnBook
  ) {
    search(
      filter: {
        textContains: $title
        book: $book
        tune: $tune
        occasion: $occasion
        keyword: $keyword
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
        hymnNumber
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
