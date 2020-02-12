import '@reach/dialog/styles.css';

import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {AppProps} from 'next/app';

const App: FC<AppProps> = ({Component, pageProps}) => (
  <Component {...pageProps} />
);

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.any.isRequired
};

export default App;
