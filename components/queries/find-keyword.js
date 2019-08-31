import gql from 'graphql-tag';

export default gql`
  query findKeyword($title: String, $skip: Int, $limit: Int) {
    keywordMany(
      filter: {text_contains: $title}
      limit: $limit
      skip: $skip
      sort: NAME_ASC
    ) {
      _id
      name
    }
  }
`;
