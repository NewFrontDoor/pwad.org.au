import gql from 'graphql-tag';

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
    }
  }
`;
