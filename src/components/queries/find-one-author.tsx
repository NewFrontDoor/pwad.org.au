import {gql} from '@apollo/client';
import menuItem from './fragments/menu-item';

export default gql`
  query findOneAuthor($id: ID!) {
    main {
      _id
      menuItems {
        ...menuItem
      }
    }
    authorById(id: $id) {
      _id
      _type
      name
      dates
      hymns {
        _id
        _type
        title
        hymnNumber
      }
      liturgies {
        _id
        _type
        title
      }
    }
  }
  ${menuItem}
`;
