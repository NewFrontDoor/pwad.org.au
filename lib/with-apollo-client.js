/* eslint-env browser */

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';
import {Ability} from '@casl/ability';
import {AbilityContext} from '../components/ability-context';
import {ME} from '../components/queries';
import sanity, {SanityContext} from './sanity';

import {defineAbilitiesFor} from './abilities';

const ability = new Ability([]);

const SanityProvider = SanityContext.Provider;

export default function withApollo(PageComponent, {ssr = true} = {}) {
  const WithApollo = ({apolloClient, apolloState, ...pageProps}) => {
    const client = apolloClient || initApolloClient(apolloState);

    useEffect(() => {
      async function fetchRoles() {
        const {data} = await client.query({query: ME});
        if (data.me) {
          const {rules} = defineAbilitiesFor(data.me);
          ability.update(rules);
        }
      }

      fetchRoles();
    }, [client]);

    return (
      <ApolloProvider client={client}>
        <AbilityContext.Provider value={ability}>
          <SanityProvider value={sanity}>
            <PageComponent {...pageProps} />
          </SanityProvider>
        </AbilityContext.Provider>
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
      apolloClient: PropTypes.object,
      apolloState: PropTypes.object
    };

    WithApollo.defaultProps = {
      apolloClient: undefined,
      apolloState: {}
    };
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async context => {
      const {AppTree, res, req} = context;
      const {cookie} = req ? req.headers : {};

      const apolloClient = initApolloClient({}, cookie);

      context.apolloClient = apolloClient;

      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(context)
        : {};

      // Get apolloState on the server (needed for ssr)
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (res && res.finished) {
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

function createApolloClient(initialState = {}, cookie = '') {
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
    cache: new InMemoryCache().restore(initialState)
  });
}
