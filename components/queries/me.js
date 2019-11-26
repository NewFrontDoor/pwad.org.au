import gql from 'graphql-tag';

export default gql`
  {
    me {
      _id
      email
      role
      hasPaidAccount
      hasFreeAccount
      picture
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
