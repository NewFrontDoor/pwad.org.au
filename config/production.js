module.exports = {
  dev: false,

  PORT: process.env.PORT || 3000,

  MONGO_URI: process.env.MONGO_URI,

  HOST_URL: 'https://pwad.org.au',
  GRAPHQL_URI: 'https://pwad.org.au/graphql',

  API_CLIENT_URL: 'https://pwad.org.au',
  API_SERVER_URL: 'https://pwad.org.au',

  SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET
};
