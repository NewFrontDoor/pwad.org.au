import gql from 'graphql-tag';

export default gql`
  mutation cancelSubscription {
    cancelSubscription {
      id
      status
      startDate
      daysUntilDue
      cancelAt
      canceledAt
      currentPeriodEnd
      plan
    }
  }
`;
