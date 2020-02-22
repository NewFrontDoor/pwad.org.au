import gql from 'graphql-tag';

export default gql`
  mutation stripeCheckoutSession {
    stripeCheckoutSession {
      sessionId
    }
  }
`;
