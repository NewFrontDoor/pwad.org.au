import gql from 'graphql-tag';

export default gql`
  query textSearch($search: String) {
    textSearch(filter: {search: $search}) {
      ... on Document {
        _id
        _type
      }
      ... on Hymn {
        title
        content
        keywords {
          _id
          name
        }
      }
      ... on Prayer {
        title
        content
        keywords {
          _id
          name
        }
      }
      ... on Liturgy {
        title
        content
        keywords {
          _id
          name
        }
      }
    }
  }
`;
