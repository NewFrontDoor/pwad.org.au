import {gql} from '@apollo/client';

export default gql`
  mutation addShortListItem($item: ID!) {
    addShortListItem(item: $item) {
      ... on Document {
        _id
        _type
      }
      ... on Hymn {
        title
        hymnNumber
      }
      ... on Liturgy {
        title
      }
      ... on Prayer {
        title
      }
      ... on Scripture {
        title
      }
    }
  }
`;
