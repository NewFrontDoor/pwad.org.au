const util = require('util');
const express = require('express');
const keystone = require('keystone');
const pinoHttp = require('pino-http');

const corsHandler = require('./handlers/cors');
const authenticationHandler = require('./handlers/authentication');
const passportHandler = require('./handlers/passport');
const graphqlHandler = require('./handlers/graphql');
const keystoneHandler = require('./handlers/keystone');
const paymentHandler = require('./handlers/payment');

const openDatabaseConnection = util.promisify(
  keystone.openDatabaseConnection.bind(keystone)
);
const closeDatabaseConnection = util.promisify(
  keystone.closeDatabaseConnection.bind(keystone)
);

const start = async ({app}) => {
  const keystoneConfig = require('./config/keystone');

  const server = express();
  server.enable('trust proxy');

  keystone.init(keystoneConfig.options);
  keystone.import('models');
  keystone.set('locals', keystoneConfig.locals);
  keystone.set('nav', keystoneConfig.nav);
  keystone.set('auth', (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect(`/sign-in?r=${req.originalUrl}`);
    }
  });

  keystone.initDatabaseConfig();
  keystone.initExpressSession(keystone.mongoose);

  server.use(corsHandler);
  server.use(pinoHttp());
  server.use(keystone.get('session options').cookieParser);
  server.use(keystone.expressSession);
  server.use(keystone.session.persist);
  server.use(passportHandler(keystone));

  server.use(express.static('static'));
  server.use('/keystone', keystone.Admin.Server.createStaticRouter(keystone));
  server.use('/keystone', keystoneHandler);
  server.use('/keystone', keystone.Admin.Server.createDynamicRouter(keystone));
  server.use('/auth', authenticationHandler);
  server.use('/graphql', graphqlHandler(keystone));
  server.use('/payment', paymentHandler);

  server.get('*', app.getRequestHandler());

  await openDatabaseConnection();

  return server;
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
