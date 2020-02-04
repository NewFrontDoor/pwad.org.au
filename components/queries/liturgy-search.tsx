import gql from 'graphql-tag';

export default gql`
  query liturgySearch($title: String, $occasion: String, $keywords: [String]) {
    liturgySearch(
      filter: {textContains: $title, occasion: $occasion, keywords: $keywords}
    ) {
      _id
      _type
      title
      content
      keywords {
        _id
        name
      }
    }
  }
`;
