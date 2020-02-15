import gql from 'graphql-tag';

export default gql`
  query pageContent($slug: String) {
    pageContentOne(filter: {slug: $slug}) {
      _id
      title
      content
      hasToc
      slug
      subtitle
    }
  }
`;
