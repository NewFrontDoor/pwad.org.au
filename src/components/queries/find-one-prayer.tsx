import gql from 'graphql-tag';

export default gql`
  query findOnePrayer($id: ID!) {
    prayerById(id: $id) {
      _id
      author {
        _id
        name
        dates
      }
      title
      content
      copyright {
        _id
        name
      }
    }
  }
`;
