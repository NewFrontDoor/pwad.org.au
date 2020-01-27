/** @jsx jsx */

import {FC, ReactNode} from 'react';
import {jsx, ThemeProvider, Box} from 'theme-ui';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {rgba} from 'polished';

import {useHomeQuery} from './queries';
import NavBar from './nav-bar/nav-bar';
import Footer from './footer/footer';
import BannerImage, {randomBanner} from './banner-image';

import GlobalStyles from './global-styles';

import theme from './theme';

const bannerImage = randomBanner();

const isBrowser = typeof window !== 'undefined';

type PageLayoutProps = {
  children?: ReactNode;
};

const PageLayout: FC<PageLayoutProps> = ({children}) => {
  const {data} = useHomeQuery();

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
        <GlobalStyles />
        <Box
          marginTop="1rem"
          paddingBottom="15vh"
          sx={{
            background: `linear-gradient(
                0deg,
                ${theme.colors.gray[1]},
                ${rgba(theme.colors.gray[1], 0.2)}
              )`
          }}
        >
          <Box
            marginY={0}
            marginX={[4, 'auto']}
            sx={{
              width: ['auto', '75%']
            }}
          >
            <BannerImage image={bannerImage} />
            {data && isBrowser && <NavBar menuItems={data.main.menuItems} />}
            {children}
          </Box>
        </Box>
        {data && <Footer menuItems={data.main.menuItems} />}
      </>
    </ThemeProvider>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageLayout;
