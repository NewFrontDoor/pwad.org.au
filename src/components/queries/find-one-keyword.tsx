import {gql} from '@apollo/client';
import menuItem from './fragments/menu-item';

export default gql`
  query findOneKeyword($id: ID!) {
    main {
      _id
      menuItems {
        ...menuItem
      }
    }
    keywordById(id: $id) {
      name
      hymns {
        _id
        _type
        title
        hymnNumber
      }
      prayers {
        _id
        _type
        title
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
