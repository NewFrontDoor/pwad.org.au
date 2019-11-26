import gql from 'graphql-tag';

export default gql`
  mutation removeShortListItem($hymn: String) {
    removeShortListItem(hymn: $hymn) {
      _id
      shortlist {
        _id
        title
        hymnNumber
      }
    }
  }
`;
