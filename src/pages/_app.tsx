// TODO: import '@reach/dialog/styles.css';

import React, {FC, useEffect} from 'react';
import PropTypes from 'prop-types';
import {AppProps} from 'next/app';
import {ApolloProvider} from '@apollo/client';
import {useApollo} from '../../lib/apollo/client';
import {AbilityProvider} from '../components/ability-context';

import Router from 'next/router'
import * as gtag from '../../lib/google-analytics'


const App: FC<AppProps> = ({Component, pageProps}) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <ApolloProvider client={apolloClient}>
      <AbilityProvider>
        <Component {...pageProps} />
      </AbilityProvider>
    </ApolloProvider>
  );
};

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.any.isRequired
};

export default App;
