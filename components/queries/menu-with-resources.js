import gql from 'graphql-tag';

export default gql`
  {
    menuWithResources {
      _id
      code
      name
      resources {
        name
        type
      }
    }
  }
`;
