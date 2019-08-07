import gql from 'graphql-tag';

export default gql`
  query listAll($title: String, $hymnMetres: [MongoID]) {
    hymnMany(filter: {title_contains: $title, includes_metre: $hymnMetres}) {
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
