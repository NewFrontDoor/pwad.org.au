import {gql} from '@apollo/client';
import menuItem from './fragments/menu-item';

export default gql`
  query findOnePrayer($id: ID!) {
    main {
      _id
      menuItems {
        ...menuItem
      }
    }
    prayerById(id: $id) {
      _id
      author {
        _id
        name
        dates
      }
      title
      content
      copyright {
        _id
        name
      }
    }
  }
  ${menuItem}
`;
