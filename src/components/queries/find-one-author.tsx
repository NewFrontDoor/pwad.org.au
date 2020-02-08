import gql from 'graphql-tag';

export default gql`
  query findOneAuthor($id: ID!) {
    authorById(id: $id) {
      _id
      _type
      name
      dates
      hymns {
        _id
        _type
        title
        hymnNumber
      }
      liturgies {
        _id
        _type
        title
      }
    }
  }
`;
