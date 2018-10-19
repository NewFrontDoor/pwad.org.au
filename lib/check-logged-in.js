import gql from 'graphql-tag';

const checkLoggedIn = gql`
  query getUser {
    me {
      _id
      name {
        first
        last
      }
    }
  }
`;

export default async apolloClient => {
  try {
    const {data} = await apolloClient.query({
      query: checkLoggedIn
    });
    return {loggedInUser: {user: data.me}};
  } catch (error) {
    console.log(error);
    return {loggedInUser: {}};
  }
};
