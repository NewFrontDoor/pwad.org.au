import {gql} from '@apollo/client';

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
