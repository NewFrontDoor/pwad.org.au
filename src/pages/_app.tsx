// TODO: import '@reach/dialog/styles.css';

import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {AppProps} from 'next/app';
import {ApolloProvider} from '@apollo/client';
import {useApollo} from '../../lib/apollo/client';
import {AbilityProvider} from '../components/ability-context';

const App: FC<AppProps> = ({Component, pageProps}) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

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
