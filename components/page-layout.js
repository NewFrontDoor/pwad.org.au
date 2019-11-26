/** @jsx jsx */

import {jsx, css} from '@emotion/core';
import PropTypes from 'prop-types';
import Box from 'mineral-ui/Box';
import Head from 'next/head';
import {ThemeProvider} from 'mineral-ui/themes';

import NavBar from './nav-bar/nav-bar';
import Footer from './footer/footer';
import BannerImage, {randomBanner} from './banner-image';

import GlobalStyles from './global-styles';

import theme from './theme';

const bannerImage = randomBanner();

const isBrowser = typeof window !== 'undefined';

function PageLayout({menuItems, children}) {
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
          marginTop="1rem"
          paddingBottom="15vh"
          css={css`
            background: ${theme.color_theme_10};
          `}
        >
          <Box
            breakpoints={['narrow']}
            width={['auto', 3 / 4]}
            marginVertical={0}
            marginHorizontal={['md', 'auto']}
          >
            <BannerImage image={bannerImage} />
            {isBrowser && <NavBar menuItems={menuItems} />}
            {children}
          </Box>
        </Box>
        <Footer menuItems={menuItems} />
      </>
    </ThemeProvider>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  menuItems: PropTypes.array.isRequired
};

export default PageLayout;
