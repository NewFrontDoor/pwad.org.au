import gql from 'graphql-tag';

export default gql`
  query Home {
    main {
      heading
      subheading
      blurb
      searchblurb
      menuItems {
        _key
        text
        childpages {
          ... on PageContent {
            _id
            _type
            title
          }
        }
      }
    }
  }
`;
