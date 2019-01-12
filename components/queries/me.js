import gql from 'graphql-tag';

export default gql`
  {
    me {
      _id
      hasPaidAccount
      hasFreeAccount
      profilePhoto
      name {
        first
        last
      }
    }
  }
`;
