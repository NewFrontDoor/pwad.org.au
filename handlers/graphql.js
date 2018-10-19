const {promisify} = require('util');
const config = require('config');
const expressGraphQL = require('express-graphql');
const buildSchema = require('../schema');

module.exports = keystone => {
  const dev = config.get('dev');
  const schema = buildSchema(keystone);

  return expressGraphQL(req => {
    const {login} = req;

    const context = {
      ...req,
      login: promisify(login.bind(req))
    };

    return {
      schema,
      graphiql: dev,
      context,
      pretty: dev
    };
  });
};
