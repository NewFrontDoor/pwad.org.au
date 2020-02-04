import gql from 'graphql-tag';

export default gql`
  query prayerSearch($title: String, $occasion: String, $keywords: [String]) {
    prayerSearch(
      filter: {textContains: $title, occasion: $occasion, keywords: $keywords}
    ) {
      _id
      _type
      title
      content
      keywords {
        _id
        name
      }
    }
  }
`;
