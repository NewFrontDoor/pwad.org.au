import {gql} from '@apollo/client';

export default gql`
  fragment menuItem on MenuItem {
    _key
    text
    childpages {
      _id
      alternateText
      childPage {
        ... on Document {
          _id
          _type
        }

        ... on PageContent {
          slug
          title
        }

        ... on Asset {
          name
          url
        }
      }
    }
  }
`;
