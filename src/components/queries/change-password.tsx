import gql from 'graphql-tag';

export default gql`
  mutation changePassword {
    changePassword {
      ticket
    }
  }
`;
