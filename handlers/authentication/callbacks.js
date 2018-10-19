const {URL} = require('url');
const config = require('config');
const passport = require('passport');
const {getCookies, signCookie} = require('../cookies');

const hostUrl = config.get('HOST_URL');

const callback = (req, res) => {
  const redirectUrl = req.session.redirectUrl
    ? new URL(req.session.redirectUrl)
    : new URL(hostUrl);
  redirectUrl.searchParams.append('authed', 'true');

  // Add the session cookies to the query params if token authentication
  if (
    req.session.authType === 'token' &&
    req.session.passport &&
    req.session.passport.user
  ) {
    const cookies = getCookies({userId: req.session.passport.user});

    redirectUrl.searchParams.append(
      'accessToken',
      signCookie(
        `session=${cookies.session}; session.sig=${cookies['session.sig']}`
      )
    );
  }

  req.session.authType = undefined;
  // Delete the redirectURL from the session again so we don't redirect
  // to the old URL the next time around
  req.session.redirectUrl = undefined;
  return res.redirect(redirectUrl.href);
};

module.exports = strategy => {
  const authenticate = passport.authenticate(strategy, {
    failureRedirect: hostUrl
  });

  return [authenticate, callback];
};
