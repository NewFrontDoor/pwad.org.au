const {deferConfig} = require('config/defer');

module.exports = {
  dev: false,

  PORT: process.env.PORT || 3000,

  MONGO_URI: process.env.MONGO_URI,

  HOST: process.env.HOST || 'pwad.org.au',
  HOST_URL: process.env.HOST_URL || 'https://pwad.org.au',
  GRAPHQL_URI: deferConfig(config => `${config.HOST_URL}/graphql`),

  API_CLIENT_URL: 'https://pwad.org.au',
  API_SERVER_URL: 'https://pwad.org.au',

  API_TOKEN_SECRET: process.env.API_TOKEN_SECRET,
  SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,

  S3_KEY: process.env.S3_KEY,
  S3_SECRET: process.env.S3_SECRET,
  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.S3_REGION,
  CLOUDFRONT_PUBLIC_URL: process.env.CLOUDFRONT_PUBLIC_URL,

  GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET
};
