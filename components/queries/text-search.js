import gql from 'graphql-tag';

export default gql`
  query textSearch($search: String) {
    hymnMany(filter: {text_contains: $search}) {
      _id
      title
      score
      lyrics {
        md(truncate: 120)
      }
    }
    prayerMany(filter: {text_contains: $search}) {
      _id
      title
      score
      content {
        md(truncate: 120)
      }
    }
    liturgyMany(filter: {text_contains: $search}) {
      _id
      title
      score
      content {
        md(truncate: 120)
      }
    }
  }
`;
