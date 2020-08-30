import {gql} from '@apollo/client';

export default gql`
  mutation cancelSubscription {
    cancelSubscription {
      id
      status
      startDate
      cancelAt
      canceledAt
      currentPeriodEnd
      plan
    }
  }
`;
