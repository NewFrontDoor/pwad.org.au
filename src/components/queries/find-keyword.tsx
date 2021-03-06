import {gql} from '@apollo/client';

export default gql`
  query findKeyword($title: String, $skip: Int, $limit: Int) {
    keywordMany(
      filter: {textContains: $title}
      limit: $limit
      skip: $skip
      sort: name_ASC
    ) {
      _id
      name
    }
  }
`;
