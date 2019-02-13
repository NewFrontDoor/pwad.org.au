const config = require('config');

module.exports = {
  publicRuntimeConfig: {
    dev: config.get('dev'),
    graphqlUri: config.get('GRAPHQL_URI'),
    hostUrl: config.get('HOST_URL')
  },
  onDemandEntries: {
    websocketPort: 3100
  }
};
