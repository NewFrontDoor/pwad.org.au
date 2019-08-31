/* eslint-env browser */

import Head from 'next/head';
import getConfig from 'next/config';
import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';

const {publicRuntimeConfig} = getConfig();

function buildUri({host, protocol, pathname}) {
  return new URL(pathname, `${protocol}://${host}`).toString();
}

function getHost(req) {
  return req ? req.headers.host : window.location.host;
}

function getCookie(req) {
  return req ? req.headers.cookie || '' : document.cookie;
}

export default function withApollo(PageComponent) {
  const WithApollo = ({apolloClient, apolloState, host, ...pageProps}) => {
    const client = useMemo(() => {
      // We pass in the apolloClient directly when using getDataFromTree
      if (apolloClient) {
        return apolloClient;
      }

      // Otherwise initClient using apolloState
      return initApolloClient(apolloState, {
        getHost: () => host,
        getToken: () => {
          return getCookie();
        }
      });
    }, [apolloState, host, apolloClient]);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
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
      host: PropTypes.string.isRequired,
      apolloClient: PropTypes.object,
      apolloState: PropTypes.object
    };

    WithApollo.defaultProps = {
      apolloClient: undefined,
      apolloState: {}
    };
  }

  WithApollo.getInitialProps = async context => {
    const {AppTree, req, res} = context;

    const host = getHost(req);
    const token = getCookie(req);
    const apolloClient = initApolloClient(
      {},
      {
        getHost: () => host,
        getToken: () => token
      }
    );

    context.apolloClient = apolloClient;

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(context);
    }

    if (res && res.finished) {
      // When redirecting, the response is finished.
      // No point in continuing to render
      return {};
    }

    // Get apolloState on the server (needed for ssr)
    if (typeof window === 'undefined') {
      try {
        // Run all GraphQL queries
        const {getDataFromTree} = await import('@apollo/react-ssr');
        await getDataFromTree(
          <AppTree pageProps={{...pageProps, host, apolloClient}} />
        );
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        console.error('Error while running `getDataFromTree`', error);
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
      host
    };
  };

  return WithApollo;
}

let apolloClient = null;

function initApolloClient(...args) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(...args);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(...args);
  }

  return apolloClient;
}

function createApolloClient(initialState = {}, {getToken, getHost}) {
  const uri = buildUri({
    protocol: publicRuntimeConfig.dev ? 'http' : 'https',
    host: getHost(),
    pathname: 'graphql'
  });

  const httpLink = createHttpLink({
    uri,
    credentials: 'include',
    fetch
  });

  const authLink = setContext((_, {headers}) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        Cookie: token || null
      }
    };
  });

  const isBrowser = typeof window !== 'undefined';
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState)
  });
}
