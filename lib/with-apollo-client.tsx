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
import {HttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';
import {AbilityProvider} from '../src/components/ability-context';
import introspectionQueryResultData from './fragment-types.json';

export type TApolloClient = ApolloClient<NormalizedCacheObject>;

export type WithApolloPageContext = NextPageContext & {
  apolloClient: TApolloClient;
  ctx?: {
    apolloClient: TApolloClient;
  };
};

type InitialProps = {
  apolloClient?: TApolloClient;
  apolloState?: NormalizedCacheObject;
  origin?: string;
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
    origin,
    ...pageProps
  }) => {
    const client = apolloClient || initApolloClient(apolloState, {origin});

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

    WithApollo.displayName = `withApollo(${displayName})`;

    // Set correct display name for devtools
    WithApollo.displayName = `withApollo(${displayName})`;

    WithApollo.propTypes = {
      apolloClient: PropTypes.any,
      apolloState: PropTypes.any,
      origin: PropTypes.string
    };

    WithApollo.defaultProps = {
      apolloClient: undefined,
      apolloState: {},
      origin: undefined
    };
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (context: WithApolloPageContext) => {
      const {AppTree, res, req} = context;
      const cookie = req?.headers?.cookie;
      let host: URL;

      if (req) {
        host = new URL(
          `${String(req.headers['x-forwarded-proto'])}://${String(
            req.headers['x-forwarded-host']
          )}`
        );
      } else {
        host = new URL(window.location.origin);
      }

      const {origin} = host;

      const apolloClient = initApolloClient({}, {cookie, origin});

      context.apolloClient = apolloClient;

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(context);
      }

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

            const props = {pageProps: {...pageProps, apolloClient, origin}};
            await getDataFromTree(<AppTree {...props} />);
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
        apolloState,
        origin
      };
    };
  }

  return WithApollo;
}

let apolloClient = null;

type ClientOptions = {
  cookie?: string;
  origin?: string;
};

function initApolloClient(
  initialState: NormalizedCacheObject,
  {cookie, origin}: ClientOptions
): TApolloClient {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, {cookie, origin});
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState, {cookie, origin});
  }

  return apolloClient;
}

function createApolloClient(
  initialState: NormalizedCacheObject,
  {cookie, origin}: ClientOptions
): TApolloClient {
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
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      fragmentMatcher
    }).restore(initialState)
  });
}
