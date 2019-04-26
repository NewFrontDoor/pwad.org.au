import gql from 'graphql-tag';

export default gql`
  query findOne($id: MongoID!) {
    hymnById(_id: $id) {
      title
      bookId
      wordsCopyright
      lyrics {
        md
      }
    }
  }
`;
