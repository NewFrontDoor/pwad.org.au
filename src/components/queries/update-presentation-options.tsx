import {gql} from '@apollo/client';

export default gql`
  input PresentationOptions {
    font: String
    background: String
    ratio: String
  }

  mutation updatePresentationOptions(input: PresentationOptions!): User {
    updatePresentationOptions(user: $user, options: $options) {
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