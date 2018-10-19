import App, {Container} from 'next/app';
import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {createTheme, ThemeProvider} from 'mineral-ui/themes';
import {flow} from 'lodash';
import withEmotion from '../lib/with-emotion';
import withApolloClient from '../lib/with-apollo-client';

const theme = createTheme({
  overrides: {
    // blue: #64aafa
    // dark-blue: #2952d2
    fontFamily: 'cabin'
  }
});

const enhance = flow(
  withEmotion,
  withApolloClient
);

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {pageProps};
  }

  render() {
    const {Component, pageProps, apolloClient} = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default enhance(MyApp);
