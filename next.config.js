const config = require('config');

module.exports = {
  publicRuntimeConfig: {
    graphqlUri: config.get('GRAPHQL_URI'),
    hostUrl: config.get('HOST_URL')
  }
};
