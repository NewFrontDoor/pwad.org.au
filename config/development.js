const {deferConfig} = require('config/defer');

module.exports = {
  dev: true,

  HOST: 'localhost:3000',
  HOST_URL: 'http://localhost:3000',

  SESSION_COOKIE_SECRET: 'SESSION_COOKIE_SECRET',

  S3_KEY: process.env.S3_KEY,
  S3_SECRET: process.env.S3_SECRET,
  S3_BUCKET: process.env.S3_BUCKET,
  S3_REGION: process.env.S3_REGION,
  CLOUDFRONT_PUBLIC_URL: process.env.CLOUDFRONT_PUBLIC_URL,

  GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,

  STRIPE_CLIENT_TOKEN: process.env.STRIPE_CLIENT_TOKEN,
  STRIPE_SECRET_TOKEN: process.env.STRIPE_SECRET_TOKEN,
  STRIPE_WEBHOOK_SECRET_TOKEN: process.env.STRIPE_WEBHOOK_SECRET_TOKEN
};
