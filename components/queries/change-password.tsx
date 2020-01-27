import gql from 'graphql-tag';

export default gql`
  mutation changePassword(
    $password: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    changePassword(
      password: $password
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      _updatedAt
    }
  }
`;
