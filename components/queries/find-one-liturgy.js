import gql from 'graphql-tag';

export default gql`
  query findOne($id: MongoID!) {
    liturgyById(_id: $id) {
      title
      author {
        _id
        dates
        name {
          first
          last
        }
      }
      content {
        md
      }
      copyright {
        name
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
