/* eslint-disable camelcase */

/** @jsx jsx */
import {jsx} from '@emotion/core';
import App, {Container} from 'next/app';
import Head from 'next/head';
import {ApolloProvider} from 'react-apollo';
import {createTheme, ThemeProvider} from 'mineral-ui/themes';
import {blue} from 'mineral-ui-tokens';
import Box from 'mineral-ui/Box';
import {flow} from 'lodash';
import withApolloClient from '../lib/with-apollo-client';
import GlobalStyles from '../components/global-styles';
import NavBar from '../components/nav-bar/nav-bar';
import Footer from '../components/footer/footer';
import BannerImage, {randomBanner} from '../components/banner-image';

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

    const bannerImage = randomBanner();

    return {pageProps, bannerImage};
  }

  render() {
    const {Component, pageProps, apolloClient, bannerImage} = this.props;

    return (
      <Container>
        <Head>
          <title>Public Worship and Aids to Devotion - Home</title>
          <meta
            name="Description"
            content="Public Worship and Aids to Devotion Committee Website - provided by the PWAD Committee to help congregations within the Presbyterian Church of Australia"
          />
        </Head>
        <GlobalStyles theme={theme} />
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <>
              <Box
                breakpoints={['narrow']}
                width={['auto', 3 / 4]}
                marginVertical={0}
                marginHorizontal={['md', 'auto']}
              >
                <BannerImage image={bannerImage} />
                <NavBar />
                <Component {...pageProps} />
                <Footer />
              </Box>
            </>
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default enhance(MyApp);
