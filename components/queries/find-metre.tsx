import gql from 'graphql-tag';

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
      tunes {
        _id
      }
    }
  }
`;
