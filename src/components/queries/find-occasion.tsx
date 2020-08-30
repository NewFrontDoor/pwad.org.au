import {gql} from '@apollo/client';

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
