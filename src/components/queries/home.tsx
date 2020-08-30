import {gql} from '@apollo/client';
import menuItem from './fragments/menu-item';

export default gql`
  query Home {
    main {
      _id
      heading
      subheading
      blurb
      searchblurb
      menuItems {
        ...menuItem
      }
    }
  }
  ${menuItem}
`;
