/* eslint-disable camelcase */

import App, {Container} from 'next/app';
import Head from 'next/head';
import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {createTheme, ThemeProvider} from 'mineral-ui/themes';
import {blue} from 'mineral-ui-tokens';
import Box from 'mineral-ui/Box';
import {flow} from 'lodash';
import withApolloClient from '../lib/with-apollo-client';
import GlobalStyles from '../components/global-styles';
import NavBar from '../components/nav-bar/nav-bar';
import Footer from '../components/footer/footer';

const theme = createTheme({
  colors: {
    theme: 'blue'
  },
  overrides: {
    color_theme_hover: blue[80],

    fontFamily: 'cabin'
  }
});

const enhance = flow(withApolloClient);

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
        <Head>
          <title>Public Worship and Aids to Devotion - Home</title>
          <meta
            name="Description"
            content="Public Worship and Aids to Devotion Committee Website - provided by the PWAD Committee to help congregations within the Presbyterian Church of Australia"
          />
        </Head>
        <GlobalStyles />
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Box
              breakpoints={['narrow']}
              width={['auto', 3 / 4]}
              marginVertical={0}
              marginHorizontal={['md', 'auto']}
            >
              <NavBar />
              <Component {...pageProps} />
              <Footer />
            </Box>
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default enhance(MyApp);
