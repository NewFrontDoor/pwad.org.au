import gql from 'graphql-tag';

export default gql`
  mutation($email: String!, $password: String!) {
    makePayment(email: $email, password: $password) {
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
