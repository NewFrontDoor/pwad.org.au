import gql from 'graphql-tag';

export default gql`
  query liturgySearch($title: String, $occasion: String, $keyword: String) {
    liturgySearch(
      filter: {textContains: $title, occasion: $occasion, keyword: $keyword}
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
