import gql from 'graphql-tag';

export default gql`
  query findMetre($metre: String, $skip: Int, $limit: Int) {
    metreMany(
      filter: {metre_contains: $metre}
      limit: $limit
      skip: $skip
      sort: METRE_ASC
    ) {
      _id
      metre
      tunes {
        _id
      }
    }
  }
`;
