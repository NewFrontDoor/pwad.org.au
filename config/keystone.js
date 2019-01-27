const config = require('config');

const api = {
  // API URL to be used in the client-side code
  clientUrl: config.get('API_CLIENT_URL'),
  // API URL to be used in the server-side code
  serverUrl: config.get('API_SERVER_URL')
};

const analytics = {};

const options = {
  name: 'pwad',
  brand: 'pwad',

  favicon: 'static/favicon.ico',
  less: 'static',
  static: 'static',

  updates: 'updates',
  'auto update': true,
  mongo: config.get('MONGO_URI'),

  session: true,
  auth: true,
  'trust proxy': true,
  'session store': 'mongo',
  'user model': 'User',
  'cookie secret': config.get('SESSION_COOKIE_SECRET'),
  'cookie signin': false
};

const locals = {};

const nav = {
  // people: ['users', 'staffs'],
  // content: ['pages', 'venues', 'events']
};

module.exports = {
  api,
  analytics,
  options,
  locals,
  nav
};
