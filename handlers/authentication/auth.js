const config = require('config');
const passport = require('passport');

module.exports = (strategy, options) => (req, ...rest) => {
  let url = config.get('HOST_URL');

  if (typeof req.query.r === 'string') {
    url = req.query.r;
  }

  req.session.redirectUrl = url;
  if (req.query.authType === 'token') {
    req.session.authType = 'token';
  }

  const authenticate = passport.authenticate(strategy, options);

  return authenticate(req, ...rest);
};
