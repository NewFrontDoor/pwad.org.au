const {deferConfig} = require('config/defer');

module.exports = {
  dev: true,

  PORT: process.env.PORT || 3000,

  MONGO_URI: 'mongodb://mongo/pwad',

  HOST_URL: deferConfig(config => `http://localhost:${config.PORT}`),
  GRAPHQL_URI: deferConfig(config => `http://localhost:${config.PORT}/graphql`),

  API_CLIENT_URL: deferConfig(config => `http://localhost:${config.PORT}`),
  API_SERVER_URL: deferConfig(config => `http://localhost:${config.PORT}`),

  API_TOKEN_SECRET: 'API_TOKEN_SECRET',
  SESSION_COOKIE_SECRET: 'SESSION_COOKIE_SECRET',

  GOOGLE_OAUTH_CLIENT_ID:
    '847282100207-qf2aed9qpua7spbq1b7j2mr723qnd2sr.apps.googleusercontent.com'
};
