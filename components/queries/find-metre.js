import gql from 'graphql-tag';

export default gql`
  query findMetre($metre: String) {
    metreMany(filter: {metre_contains: $metre}) {
      _id
      metre
    }
  }
`;
