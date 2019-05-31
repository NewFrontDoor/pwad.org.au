import gql from 'graphql-tag';

export default gql`
  query listAll($title: String) {
    hymnMany(filter: {title_contains: $title}) {
      _id
      title
      bookId
      lyrics {
        md(truncate: 120)
      }
    }
    scriptureMany(filter: {title_contains: $title}) {
      _id
      title
      translation
      content {
        md(truncate: 120)
      }
    }
  }
`;
