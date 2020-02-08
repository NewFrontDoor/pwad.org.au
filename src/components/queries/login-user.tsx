import gql from 'graphql-tag';

export default gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      hasPaidAccount
      hasFreeAccount
      picture
      name {
        first
        last
      }
    }
  }
`;
