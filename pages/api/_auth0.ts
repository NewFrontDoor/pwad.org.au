import {initAuth0} from '@auth0/nextjs-auth0';

const EIGHT_HOURS = 60 * 60 * 8;
const cookieSecret = process.env.SESSION_COOKIE_SECRET;
const hostUrl = process.env.HOST_URL;

export default initAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'openid profile email',
  redirectUri: `${hostUrl}/api/callback`,
  postLogoutRedirectUri: `${hostUrl}/`,
  session: {
    cookieSecret,
    cookieLifetime: EIGHT_HOURS,
    storeIdToken: false,
    storeAccessToken: false,
    storeRefreshToken: false
  },
  oidcClient: {
    httpTimeout: 2500,
    clockTolerance: 10000
  }
});
