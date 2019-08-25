import gql from 'graphql-tag';

export default gql`
  {
    occasionManyGroupById {
      name
      values {
        _id
        name
      }
    }
  }
`;
