const util = require('util');
const express = require('express');
const expressGraphQL = require('express-graphql');
const keystone = require('keystone');
const pinoHttp = require('pino-http');
const config = require('config');

const openDatabaseConnection = util.promisify(keystone.openDatabaseConnection.bind(keystone));
const closeDatabaseConnection = util.promisify(keystone.closeDatabaseConnection.bind(keystone));

const start = async ({handle = () => {}, pretty}) => {
  const keystoneConfig = require('./config/keystone');
  const port = config.get('PORT');
  const dev = config.get('dev');

  const app = express();

  keystone.init(keystoneConfig.options);
  keystone.import('models');
  keystone.set('locals', keystoneConfig.locals);
  keystone.set('nav', keystoneConfig.nav);

  keystone.initDatabaseConfig();
  keystone.initExpressSession();

  app.use('/keystone', keystone.Admin.Server.createStaticRouter(keystone));
  app.use(express.static('static'));
  app.use(keystone.get('session options').cookieParser);
  app.use(keystone.expressSession);
  app.use(keystone.session.persist);

  app.use(pinoHttp({stream: pretty}));
  app.use('/keystone', keystone.Admin.Server.createDynamicRouter(keystone));

  app.use(
    '/graphql',
    expressGraphQL(req => ({
      schema: require('./schema'),
      graphiql: dev,
      rootValue: {request: req},
      pretty: dev
    }))
  );

  app.get('*', handle);

  await openDatabaseConnection();

  return app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
};

const stop = async server => {
  await closeDatabaseConnection();
  if (server) {
    server.close();
  }
};

module.exports = {
  start,
  stop
};
