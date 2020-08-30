import {gql} from '@apollo/client';

export default gql`
  query findPrayerContents($page: Int!) {
    prayerPagination(page: $page, perPage: 20) {
      pageInfo {
        currentPage
        itemCount
        perPage
      }
      items {
        _id
        title
        content
      }
    }
  }
`;
