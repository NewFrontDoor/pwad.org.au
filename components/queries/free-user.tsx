import gql from 'graphql-tag';

export default gql`
  mutation changeFreeAccount($hasFreeAccount: Boolean!) {
    changeFreeAccount(hasFreeAccount: $hasFreeAccount) {
      __typename
      hasFreeAccount
    }
  }
`;
