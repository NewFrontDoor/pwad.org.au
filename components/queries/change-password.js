import gql from 'graphql-tag';

export default gql`
  mutation(
    $password: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    changePassword(
      password: $password
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      updatedAt
    }
  }
`;
