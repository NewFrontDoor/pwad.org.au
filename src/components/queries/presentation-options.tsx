import {gql} from '@apollo/client';

export default gql`
  query presentationOptions {
    presentationOptions {
      font
      background
      ratio
    }
  }
`;
