import {gql} from '@apollo/client';
import menuItem from './fragments/menu-item';

export default gql`
  query findOneHymn($id: ID!) {
    main {
      _id
      menuItems {
        ...menuItem
      }
    }
    hymnById(id: $id) {
      _id
      title
      hymnNumber
      copyright {
        _id
        name
      }
      content
      scripture
      author {
        _id
        dates
        name
      }
      alternateTunes {
        _id
        _type
        title
        file {
          _id
          _type
          name
          size
          url
        }
      }
      tune {
        _id
        title
        musicCopyright {
          _id
          name
        }
        composer {
          _id
          name
        }
        metre {
          _id
          metre
        }
        file {
          _id
          _type
          name
          size
          url
        }
      }
      files {
        _id
        _type
        name
        size
        url
      }
    }
  }
  ${menuItem}
`;
