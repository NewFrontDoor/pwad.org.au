import gql from 'graphql-tag';

export default gql`
  query advancedSearch(
    $title: String
    $tunes: [String]
    $occasion: String
    $keywords: [String]
    $book: EnumHymnBook
  ) {
    search(
      filter: {
        text_contains: $title
        book: $book
        occasion: $occasion
        keywords: $keywords
        _operators: {tune: {in: $tunes}}
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
