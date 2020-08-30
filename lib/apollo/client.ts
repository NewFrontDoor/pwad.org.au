/* eslint-env browser */

import {useMemo} from 'react';
import {NextPageContext} from 'next';
import {ApolloClient} from '@apollo/client';
import {InMemoryCache, NormalizedCacheObject} from '@apollo/client/cache';
import {possibleTypes} from '../fragment-types.json';

export type TApolloClient = ApolloClient<NormalizedCacheObject>;

let apolloClient: TApolloClient;

export type ApolloPageContext = NextPageContext & {
  apolloClient: TApolloClient;
};

function createIsomorphLink() {
  /* eslint-disable @typescript-eslint/no-var-requires */
  if (typeof window === 'undefined') {
    const {SchemaLink} = require('@apollo/client/link/schema');
    const {schema} = require('../graphql/schema');
    const {context} = require('../graphql/context');
    return new SchemaLink({schema, context: context()});
  }

  const {HttpLink} = require('@apollo/client/link/http');
  return new HttpLink({uri: '/api/graphql', credentials: 'same-origin'});
  /* eslint-enable @typescript-eslint/no-var-requires */
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache({
      possibleTypes
    })
  });
}

export function initializeApollo(initialState: NormalizedCacheObject = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
