import App, {Container} from 'next/app';
import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {createTheme, ThemeProvider} from 'mineral-ui/themes';
import {flow} from 'lodash';
import withEmotion from '../lib/with-emotion';
import withApolloClient from '../lib/with-apollo-client';

const theme = createTheme({
  overrides: {
    fontFamily: 'lato'
  }
});

const enhance = flow(
  withEmotion,
  withApolloClient,
);

class MyApp extends App {
  render() {
    const {Component, pageProps, apolloClient} = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps}/>
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default enhance(MyApp);
