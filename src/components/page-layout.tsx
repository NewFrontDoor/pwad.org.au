/** @jsx jsx */

import {FC, ReactNode} from 'react';
import {jsx, ThemeProvider, Box} from 'theme-ui';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {rgba} from 'polished';

import {MenuItem} from '../../queries/_types';
import NavBar from './nav-bar/nav-bar';
import Footer from './footer/footer';
import BannerImage, {randomBanner} from './banner-image';
import { GA_TRACKING_ID } from '../../lib/google-analytics'

import GlobalStyles from './global-styles';

import theme from './theme';

const bannerImage = randomBanner();

const isBrowser = typeof window !== 'undefined';

type PageLayoutProps = {
  menuItems?: MenuItem[];
  children: ReactNode;
};

const PageLayout: FC<PageLayoutProps> = ({menuItems, children}) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Head>
          <title>Public Worship and Aids to Devotion - Home</title>
          <meta
            name="Description"
            content="Public Worship and Aids to Devotion Committee Website - provided by the PWAD Committee to help congregations within the Presbyterian Church of Australia"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <GlobalStyles />
        <BannerImage image={bannerImage} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            background: `linear-gradient(
                0deg,
                ${theme.colors.gray[1]},
                ${rgba(theme.colors.gray[1], 0.4)}
              )`
          }}
        >
          <Box
            marginY={0}
            marginX={[4, 'auto']}
            paddingBottom="10vh"
            sx={{
              width: ['auto', '75%'],
              flex: '1 1 auto'
            }}
          >
            {menuItems && isBrowser && <NavBar menuItems={menuItems} />}
            {children}
          </Box>
          {menuItems && <Footer menuItems={menuItems} />}
        </Box>
      </>
    </ThemeProvider>
  );
};

PageLayout.propTypes = {
  menuItems: PropTypes.array,
  children: PropTypes.node.isRequired
};

export default PageLayout;
