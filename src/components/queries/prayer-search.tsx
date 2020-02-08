import gql from 'graphql-tag';

export default gql`
  query prayerSearch($title: String, $occasion: String, $keyword: String) {
    prayerSearch(
      filter: {textContains: $title, occasion: $occasion, keyword: $keyword}
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
