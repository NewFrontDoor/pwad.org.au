import {gql} from '@apollo/client';
import menuItem from './fragments/menu-item';

export default gql`
  query pageContent($slug: String) {
    main {
      _id
      menuItems {
        ...menuItem
      }
    }
    pageContentOne(filter: {slug: $slug}) {
      _id
      title
      content
      hasToc
      slug
      subtitle
    }
  }
  ${menuItem}
`;
