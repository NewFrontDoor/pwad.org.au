const config = require('config');
const session = require('express-session');
const {cookieKeygrip} = require('./cookies');

const ONE_YEAR = 31556952000;

// Create session middleware
module.exports = session({
  keys: cookieKeygrip,
  // Expire the browser cookie one year from now
  maxAge: ONE_YEAR,
  name: 'session',
  resave: false,
  saveUninitialized: false,
  secret: [config.get('SESSION_COOKIE_SECRET')],
  secure: !config.get('dev'),
  signed: false
});
