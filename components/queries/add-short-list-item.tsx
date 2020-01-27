import gql from 'graphql-tag';

export default gql`
  mutation addShortListItem($hymn: ID!) {
    addShortListItem(hymn: $hymn) {
      ... on Hymn {
        _id
        title
        hymnNumber
      }
    }
  }
`;
