import {initAuth0} from '@auth0/nextjs-auth0';

const EIGHT_HOURS = 60 * 60 * 8;
const cookieSecret = process.env.SESSION_COOKIE_SECRET;

export default initAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'openid profile email',
  redirectUri: `${process.env.HOST_URL}/api/callback/auth`,
  postLogoutRedirectUri: `${process.env.HOST_URL}/`,
  session: {
    cookieSecret,
    cookieLifetime: EIGHT_HOURS,
    storeIdToken: true,
    storeAccessToken: true,
    storeRefreshToken: true
  },
  oidcClient: {
    httpTimeout: 2500,
    clockTolerance: 10000
  }
});
