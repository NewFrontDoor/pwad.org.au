import gql from 'graphql-tag';

export default gql`
  query findOne($id: MongoID!) {
    hymnById(_id: $id) {
      title
      hymnNumber
      scripture
      wordsCopyright
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
        musicCopyright
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
