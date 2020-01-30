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
      shortlist {
        ... on Hymn {
          _id
          title
          hymnNumber
        }
        ... on Prayer {
          _id
        }
        ... on Liturgy {
          _id
        }
        ... on Scripture {
          _id
        }
      }
    }
  }
`;
