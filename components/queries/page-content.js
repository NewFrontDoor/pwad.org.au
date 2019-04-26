import gql from 'graphql-tag';

export default gql`
  query pageContent($page: String) {
    pageContentOne(filter: {key: $page}) {
      key
      name
      content {
        brief {
          md
        }
        extended {
          md
        }
      }
    }
  }
`;
