import {gql} from '@apollo/client';

export default gql`
  mutation stripeCheckoutSession {
    stripeCheckoutSession {
      sessionId
    }
  }
`;
