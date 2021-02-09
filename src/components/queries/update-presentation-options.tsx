import {gql} from '@apollo/client';

export default gql`
  mutation UpdatePresentationOptions($input: PresentationOptionsInput!) {
    updatePresentationOptions(input: $input) {
      background
      font
      ratio
    }
  }
`;
