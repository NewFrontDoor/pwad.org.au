import {gql} from '@apollo/client';

export default gql`
  mutation changeFreeAccount($hasFreeAccount: Boolean!) {
    changeFreeAccount(hasFreeAccount: $hasFreeAccount) {
      hasFreeAccount
    }
  }
`;
