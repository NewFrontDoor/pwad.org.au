import gql from 'graphql-tag';

export default gql`
  query findOneScripture($id: ID!) {
    scriptureById(id: $id) {
      _id
      title
      content
    }
  }
`;
