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
          _id
          alternateText
          childPage {
            ... on PageContent {
              _id
              _type
              title
            }

            ... on Asset {
              _id
              _type
              name
              url
            }
          }
        }
      }
    }
  }
`;
