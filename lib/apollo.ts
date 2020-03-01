/* eslint-env browser */

import {NextPageContext} from 'next';
import {
  InMemoryCache,
  NormalizedCacheObject,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {ApolloClient} from 'apollo-client';
import fetch from 'isomorphic-unfetch';
import introspectionQueryResultData from './fragment-types.json';
import buildUrl from './build-url';

export type TApolloClient = ApolloClient<NormalizedCacheObject> & {
  toJSON?: () => any;
};

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

function createApolloClient(
  initialState: NormalizedCacheObject,
  context?: NextPageContext
): TApolloClient {
  const hasContext = Boolean(context);
  const {origin} = buildUrl(context?.req);
  const cookie = context?.req?.headers?.cookie;

  const {href: uri} = new URL('/api/graphql', origin);

  const authLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        cookie
      }
    };
  });

  const httpLink = new HttpLink({
    credentials: 'same-origin',
    fetch,
    uri
  });

  const isBrowser = typeof window !== 'undefined';
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: hasContext,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      fragmentMatcher
    }).restore(initialState)
  });
}

export default createApolloClient;
