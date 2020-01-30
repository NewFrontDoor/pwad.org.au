import gql from 'graphql-tag';

export default gql`
  query findOneHymn($id: ID!) {
    hymnById(id: $id) {
      _id
      title
      hymnNumber
      copyright {
        name
      }
      content
      scripture
      author {
        _id
        dates
        name
      }
      tune {
        title
        musicCopyright {
          name
        }
        composer {
          _id
          name
        }
        metre {
          metre
        }
      }
      files {
        _id
        file
      }
    }
  }
`;
