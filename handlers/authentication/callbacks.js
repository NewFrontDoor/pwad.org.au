const {URL} = require('url');
const config = require('config');
const passport = require('passport');

const hostUrl = config.get('HOST_URL');

const callback = (req, res) => {
  const redirectUrl = req.session.redirectUrl
    ? new URL(req.session.redirectUrl)
    : new URL(hostUrl);

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
