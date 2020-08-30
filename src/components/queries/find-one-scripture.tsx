import {gql} from '@apollo/client';
import menuItem from './fragments/menu-item';

export default gql`
  query findOneScripture($id: ID!) {
    main {
      _id
      menuItems {
        ...menuItem
      }
    }
    scriptureById(id: $id) {
      _id
      title
      content
    }
  }
  ${menuItem}
`;
