import gql from 'graphql-tag';

export default gql`
  {
    me {
      _id
      role
      hasPaidAccount
      hasFreeAccount
      profilePhoto
      name {
        first
        last
      }
      shortlist {
        _id
        title
        hymnNumber
      }
    }
  }
`;
