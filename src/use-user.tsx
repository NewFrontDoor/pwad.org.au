import {useEffect} from 'react';
import Router from 'next/router';
import {ApolloClient} from '@apollo/client';
import {useMeQuery, User} from './components/queries';

type LoggedInUser = {
  loading: boolean;
  client: ApolloClient<any>;
  loggedInUser: {
    user?: User;
  };
};

type Options = {
  redirectTo?: string | false;
  redirectIfFound?: boolean;
};

function useUser({
  redirectTo = false,
  redirectIfFound = false
}: Options = {}): LoggedInUser {
  const {data, loading, client} = useMeQuery();
  const user = data?.me;

  useEffect(() => {
    // If no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user)
    ) {
      void Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return {loggedInUser: {user}, client, loading};
}

export default useUser;
