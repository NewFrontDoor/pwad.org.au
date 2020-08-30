import {gql} from '@apollo/client';
import menuItem from './fragments/menu-item';

export default gql`
  query findOneLiturgy($id: ID!) {
    main {
      _id
      menuItems {
        ...menuItem
      }
    }
    liturgyById(id: $id) {
      _id
      title
      author {
        _id
        dates
        name
      }
      content
      copyright {
        _id
        name
      }
      files {
        _id
        name
        size
        url
      }
    }
  }
  ${menuItem}
`;
