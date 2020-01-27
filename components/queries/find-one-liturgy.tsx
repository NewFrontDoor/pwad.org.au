import gql from 'graphql-tag';

export default gql`
  query findOneLiturgy($id: ID!) {
    liturgyById(id: $id) {
      _id
      title
      author {
        _id
        dates
        name
      }
      content
      copyright {
        name
      }
      files {
        _id
        file
      }
    }
  }
`;
