import gql from 'graphql-tag';

export default gql`
  query findOccasion {
    occasionManyGroupById {
      name
      values {
        _id
        name
      }
    }
  }
`;
