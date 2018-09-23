const {deferConfig} = require('config/defer');

module.exports = {
  dev: true,

  PORT: process.env.PORT || 3000,

  MONGO_URI: 'mongodb://mongo/pwad',

  HOST_URL: deferConfig(config => `http://localhost:${config.port}`),
  GRAPHQL_URI: 'http://localhost:3000/graphql',

  API_CLIENT_URL: deferConfig(config => config.HOST_URL),
  API_SERVER_URL: deferConfig(config => config.HOST_URL),

  SESSION_COOKIE_SECRET: 'SESSION_COOKIE_SECRET'
};
