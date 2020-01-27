/* eslint-env browser */

import React from 'react';
import {NextPage, NextPageContext} from 'next';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-client';
import {
  InMemoryCache,
  NormalizedCacheObject,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';
import {AbilityProvider} from '../components/ability-context';
import introspectionQueryResultData from './fragment-types.json';

export type TApolloClient = ApolloClient<NormalizedCacheObject>;

export type WithApolloPageContext = NextPageContext & {
  apolloClient: TApolloClient;
};

type InitialProps = {
  apolloClient?: TApolloClient;
  apolloState?: NormalizedCacheObject;
} & Record<string, any>;

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

export default function withApollo(
  PageComponent: NextPage,
  {ssr = true} = {}
): NextPage<InitialProps> {
  const WithApollo: NextPage<InitialProps> = ({
    apolloClient,
    apolloState,
    ...pageProps
  }) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <AbilityProvider>
          <PageComponent {...pageProps} />
        </AbilityProvider>
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    // Find correct display name
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    // Warn if old way of installing apollo is used
    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    // Set correct display name for devtools
    WithApollo.displayName = `withApollo(${displayName})`;

    WithApollo.propTypes = {
      apolloClient: PropTypes.any,
      apolloState: PropTypes.any
    };

    WithApollo.defaultProps = {
      apolloClient: undefined,
      apolloState: {}
    };
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (context: WithApolloPageContext) => {
      const {AppTree, res, req} = context;
      const cookie = req?.headers?.cookie;

      const apolloClient = initApolloClient({}, cookie);

      context.apolloClient = apolloClient;

      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(context)
        : {};

      // Get apolloState on the server (needed for ssr)
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (res?.finished) {
          return {};
        }

        if (ssr) {
          try {
            // Run all GraphQL queries
            const {getDataFromTree} = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree pageProps={{...pageProps, apolloClient}} />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }
        }

        // `getDataFromTree` does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState
      };
    };
  }

  return WithApollo;
}

let apolloClient = null;

function initApolloClient(
  initialState?: NormalizedCacheObject,
  cookie?: string
): TApolloClient {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, cookie);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState, cookie);
  }

  return apolloClient;
}

function createApolloClient(
  initialState: NormalizedCacheObject = {},
  cookie = ''
): TApolloClient {
  const uri = 'http://localhost:3000/api/graphql';

  const authLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        cookie
      }
    };
  });

  const httpLink = createHttpLink({
    credentials: 'include',
    fetch,
    uri
  });

  const isBrowser = typeof window !== 'undefined';
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      fragmentMatcher
    }).restore(initialState)
  });
}
