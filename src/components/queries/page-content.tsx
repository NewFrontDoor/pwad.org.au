import gql from 'graphql-tag';

export default gql`
  query pageContent($page: String) {
    pageContentOne(filter: {id: $page}) {
      _id
      title
      content
      hasToc
      slug
      subtitle
    }
  }
`;
