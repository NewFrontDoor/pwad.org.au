import gql from 'graphql-tag';

export default gql`
  query Me {
    me {
      _id
      email
      role
      hasFreeAccount
      hasPaidAccount
      picture
      name {
        first
        last
      }
      periodEndDate
      stripeCustomerId
      shortlist {
        ... on Document {
          _id
          _type
        }
        ... on Hymn {
          title
          hymnNumber
        }
        ... on Prayer {
          title
        }
        ... on Liturgy {
          title
        }
        ... on Scripture {
          title
        }
      }
    }
  }
`;
