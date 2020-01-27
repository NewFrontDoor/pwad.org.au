import gql from 'graphql-tag';

export default gql`
  query findOneKeyword($id: ID!) {
    keywordById(id: $id) {
      name
      hymns {
        _id
        title
        hymnNumber
      }
      prayers {
        _id
        title
      }
      liturgies {
        _id
        title
      }
    }
  }
`;
