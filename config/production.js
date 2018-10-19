module.exports = {
  dev: false,

  PORT: process.env.PORT || 3000,

  MONGO_URI: process.env.MONGO_URI,

  HOST_URL: 'https://pwad.org.au',
  GRAPHQL_URI: 'https://pwad.org.au/graphql',

  API_CLIENT_URL: 'https://pwad.org.au',
  API_SERVER_URL: 'https://pwad.org.au',

  API_TOKEN_SECRET: process.env.API_TOKEN_SECRET,
  SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,

  GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET
};
