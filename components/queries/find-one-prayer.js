import gql from 'graphql-tag';

export default gql`
  query findOne($id: MongoID!) {
    prayerById(_id: $id) {
      title
      content {
        md
      }
    }
  }
`;
