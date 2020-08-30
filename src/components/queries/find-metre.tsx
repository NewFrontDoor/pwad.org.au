import {gql} from '@apollo/client';

export default gql`
  query findMetre($metre: String, $skip: Int, $limit: Int) {
    metreMany(
      filter: {textContains: $metre}
      limit: $limit
      skip: $skip
      sort: metre_ASC
    ) {
      _id
      metre
    }
  }
`;
