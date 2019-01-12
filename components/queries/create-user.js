import gql from 'graphql-tag';

export default gql`
  mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
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
