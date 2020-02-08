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
        _id
        name
      }
      files {
        _id
        name
        size
        url
      }
    }
  }
`;
