import {gql} from '@apollo/client';

export default gql`
  mutation changePassword {
    changePassword {
      ticket
    }
  }
`;
