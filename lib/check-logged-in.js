import {ME} from '../components/queries';

export default async apolloClient => {
  try {
    const {data} = await apolloClient.query({
      query: ME
    });
    return {loggedInUser: {user: data.me}};
  } catch (error) {
    console.error(error);
    return {loggedInUser: {}};
  }
};
