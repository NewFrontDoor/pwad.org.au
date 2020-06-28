import {TApolloClient} from '../lib/apollo';
import {MeDocument, MeQuery, User} from './components/queries';

type LoggedInUser = {
  loggedInUser: {
    user?: User;
  };
};

async function checkLoggedIn(
  apolloClient: TApolloClient
): Promise<LoggedInUser> {
  try {
    const {data} = await apolloClient.query<MeQuery>({
      query: MeDocument
    });
    return {loggedInUser: {user: data.me}};
  } catch (error) {
    console.error(error);
    return {loggedInUser: {}};
  }
}

export default checkLoggedIn;
