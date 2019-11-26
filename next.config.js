require('dotenv').config();
const config = require('config');

module.exports = {
  env: {
    dev: config.get('dev'),
    stripeClientToken: config.get('STRIPE_CLIENT_TOKEN'),
    graphqlUri: config.get('GRAPHQL_URI'),
    hostUrl: config.get('HOST_URL')
  },
  onDemandEntries: {
    websocketPort: 3100
  },
  webpack(config) {
    config.node = {fs: 'empty'};
    return config;
  }
};
