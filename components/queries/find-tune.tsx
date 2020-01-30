import gql from 'graphql-tag';

export default gql`
  query findTune($title: String, $skip: Int, $limit: Int) {
    tuneMany(
      filter: {textContains: $title}
      limit: $limit
      skip: $skip
      sort: title_ASC
    ) {
      _id
      title
    }
  }
`;
