import gql from 'graphql-tag';

export default gql`
  mutation addShortListItem($hymn: MongoID) {
    addShortListItem(hymn: $hymn) {
      _id
      shortlist {
        _id
        title
        hymnNumber
      }
    }
  }
`;
