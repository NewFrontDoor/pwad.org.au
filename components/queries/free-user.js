import gql from 'graphql-tag';

export default gql`
  mutation($hasFreeAccount: Boolean!) {
    changeFreeAccount(hasFreeAccount: $hasFreeAccount) {
      __typename
      hasFreeAccount
    }
  }
`;
