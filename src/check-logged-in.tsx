import {TApolloClient} from '../lib/apollo';
import {MeDocument, MeQuery, User} from './components/queries';

type LoggedInUser = {
  loggedInUser: {
    user?: User;
  };
};

export default async (apolloClient: TApolloClient): Promise<LoggedInUser> => {
  try {
    const {data} = await apolloClient.query<MeQuery>({
      query: MeDocument
    });
    return {loggedInUser: {user: data.me}};
  } catch (error) {
    console.error(error);
    return {loggedInUser: {}};
  }
};
