import gql from 'graphql-tag';

export default gql`
  query findOne($id: MongoID!) {
    hymnById(_id: $id) {
      _id
      title
      hymnNumber
      scripture
      wordsCopyright {
        name
      }
      lyrics {
        md
      }
      author {
        _id
        dates
        name {
          first
          last
        }
      }
      tune {
        title
        musicCopyright {
          name
        }
        composer {
          _id
          name {
            first
            last
          }
        }
        metre {
          metre
        }
      }
      bio {
        html
        md
      }
      files {
        _id
        file {
          size
          mimetype
          url
          filename
        }
      }
    }
  }
`;
