import {gql} from '@apollo/client';

export default gql`
  query currentSubscription {
    subscription {
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
