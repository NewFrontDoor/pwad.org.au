/* eslint-env browser */

import React from 'react';
import {NextPage, NextPageContext} from 'next';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {ApolloProvider} from '@apollo/react-hooks';
import {NormalizedCacheObject} from 'apollo-cache-inmemory';
import {AbilityProvider} from '../src/components/ability-context';
import buildUrl from './build-url';
import createApolloClient, {TApolloClient} from './apollo';

export type WithApolloPageContext = NextPageContext & {
  apolloState: NormalizedCacheObject;
  apolloClient: TApolloClient;
};

type InitialProps = {
  apolloClient?: TApolloClient;
  apolloState?: NormalizedCacheObject;
  origin?: string;
} & Record<string, any>;

// On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.
let globalApolloClient: TApolloClient = null;

/**
 * Creates a withApollo HOC that provides the apolloContext to a next.js Page.
 */
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
    let client: TApolloClient;

    if (apolloClient) {
      // Happens on: getDataFromTree & next.js ssr
      client = apolloClient;
    } else {
      // Happens on: next.js csr
      client = initApolloClient(apolloState, undefined);
    }

    return (
      <ApolloProvider client={client}>
        <AbilityProvider>
          <PageComponent {...pageProps} />
        </AbilityProvider>
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

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
      const {origin} = buildUrl(req);
      const {apolloClient} = initOnContext(context);

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
          return pageProps;
        }

        if (ssr && AppTree) {
          try {
            // Import `@apollo/react-ssr` dynamically.
            // We don't want to have this in our client bundle.
            const {getDataFromTree} = await import('@apollo/react-ssr');

            const props = {pageProps: {...pageProps, apolloClient, origin}};

            // Take the Next.js AppTree, determine which queries are needed to render,
            // and fetch them. This method can be pretty slow since it renders
            // your entire AppTree once for every query. Check out apollo fragments
            // if you want to reduce the number of rerenders.
            // https://www.apollographql.com/docs/react/data/fragments/
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
        apolloClient: context.apolloClient,
        origin
      };
    };
  }

  return WithApollo;
}

/**
 * Installs the Apollo Client on NextPageContext.
 * Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerSideProps
 */
export function initOnContext(
  context: WithApolloPageContext
): WithApolloPageContext {
  // Initialize ApolloClient if not already done
  const apolloClient =
    context.apolloClient ||
    initApolloClient(context.apolloState || {}, context);

  // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.
  apolloClient.toJSON = () => null;

  // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  context.apolloClient = apolloClient;

  return context;
}

function initApolloClient(
  initialState: NormalizedCacheObject,
  context?: NextPageContext
): TApolloClient {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, context);
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, context);
  }

  return globalApolloClient;
}
