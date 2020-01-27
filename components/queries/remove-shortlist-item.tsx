import gql from 'graphql-tag';

export default gql`
  mutation removeShortListItem($hymn: ID!) {
    removeShortListItem(hymn: $hymn) {
      ... on Hymn {
        _id
        title
        hymnNumber
      }
    }
  }
`;
