import gql from 'graphql-tag';

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
