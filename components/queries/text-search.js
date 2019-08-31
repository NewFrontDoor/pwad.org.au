import gql from 'graphql-tag';

export default gql`
  query textSearch($search: String) {
    hymnMany(filter: {text_contains: $search}) {
      _id
      title
      score
      lyrics {
        md(truncate: 60)
      }
      keywords(limit: 3) {
        _id
        name
      }
    }
    prayerMany(filter: {text_contains: $search}) {
      _id
      title
      score
      content {
        md(truncate: 60)
      }
      keywords(limit: 3) {
        _id
        name
      }
    }
    liturgyMany(filter: {text_contains: $search}) {
      _id
      title
      score
      content {
        md(truncate: 60)
      }
      keywords(limit: 3) {
        _id
        name
      }
    }
  }
`;
