import gql from 'graphql-tag';

export default gql`
  query findOne($id: MongoID!) {
    keywordById(_id: $id) {
      name
      hymns {
        _id
        title
        hymnNumber
      }
      prayers {
        _id
        title
      }
      liturgies {
        _id
        title
      }
    }
  }
`;
