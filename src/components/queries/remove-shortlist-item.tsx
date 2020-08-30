import {gql} from '@apollo/client';

export default gql`
  mutation removeShortListItem($item: ID!) {
    removeShortListItem(item: $item) {
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
