const config = require('config');
const expressGraphQL = require('express-graphql');
const buildSchema = require('../schema');

module.exports = keystone => {
  const dev = config.get('dev');
  const schema = buildSchema(keystone);

  return expressGraphQL(req => ({
    schema,
    graphiql: dev,
    context: {req},
    pretty: dev
  }));
};
