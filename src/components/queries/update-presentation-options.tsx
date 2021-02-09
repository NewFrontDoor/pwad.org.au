import {gql} from '@apollo/client';

export default gql`
  mutation UpdatePresentationOptions($input: PresentationOptionsInput!) {
    updatePresentationOptions(input: $input) {
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
