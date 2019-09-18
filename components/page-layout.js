/* eslint-disable camelcase */

/** @jsx jsx */

import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';
import {blue} from 'mineral-ui-tokens';
import {createTheme, ThemeProvider} from 'mineral-ui/themes';
import Box from 'mineral-ui/Box';
import Head from 'next/head';

import NavBar from './nav-bar/nav-bar';
import Footer from './footer/footer';
import BannerImage, {randomBanner} from './banner-image';

import GlobalStyles from './global-styles';

const theme = createTheme({
  colors: {
    theme: 'blue'
  },
  overrides: {
    color_theme_hover: blue[80],

    fontFamily: 'cabin'
  }
});

function PageLayout({children}) {
  const bannerImage = randomBanner();

  return (
    <ThemeProvider theme={theme}>
      <>
        <Head>
          <title>Public Worship and Aids to Devotion - Home</title>
          <meta
            name="Description"
            content="Public Worship and Aids to Devotion Committee Website - provided by the PWAD Committee to help congregations within the Presbyterian Church of Australia"
          />
        </Head>
        <GlobalStyles theme={theme} />
        <Box
          breakpoints={['narrow']}
          width={['auto', 3 / 4]}
          marginVertical={0}
          marginHorizontal={['md', 'auto']}
        >
          <BannerImage image={bannerImage} />
          <NavBar />
          {children}
          <Footer />
        </Box>
      </>
    </ThemeProvider>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageLayout;
