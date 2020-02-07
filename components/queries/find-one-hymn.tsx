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
      alternateTunes {
        _id
        _type
        title
        file {
          _id
          _type
          name
        }
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
        file {
          _id
          _type
          name
        }
      }
      files {
        _id
        _type
        name
      }
    }
  }
`;
