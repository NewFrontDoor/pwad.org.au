import gql from 'graphql-tag';

export default gql`
  {
    menuMany(sort: SORTORDER_ASC) {
      _id
      code
      name
      link {
        name
        key
      }
      resources(sort: SORTORDER_ASC) {
        name
        type
        content {
          key
        }
        file {
          url
        }
      }
    }
  }
`;
