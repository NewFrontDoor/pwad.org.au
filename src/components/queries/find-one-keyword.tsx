import gql from 'graphql-tag';

export default gql`
  query findOneKeyword($id: ID!) {
    keywordById(id: $id) {
      name
      hymns {
        _id
        _type
        title
        hymnNumber
      }
      prayers {
        _id
        _type
        title
      }
      liturgies {
        _id
        _type
        title
      }
    }
  }
`;
