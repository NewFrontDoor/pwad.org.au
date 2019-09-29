import gql from 'graphql-tag';

export default gql`
  query findOne($id: MongoID!) {
    prayerById(_id: $id) {
      _id
      title
      content {
        md
      }
    }
  }
`;
