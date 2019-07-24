import gql from 'graphql-tag';

export default gql`
  query findOne($id: MongoID!) {
    authorById(_id: $id) {
      name {
        first
        last
      }
      dates
      hymns {
        _id
        hymnNumber
        title
      }
    }
  }
`;
