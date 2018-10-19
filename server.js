const util = require('util');
const express = require('express');
const keystone = require('keystone');
const pinoHttp = require('pino-http');
const config = require('config');

const authenticationHandler = require('./handlers/authentication');
const sessionHandler = require('./handlers/session');
const passportHandler = require('./handlers/passport');
const graphqlHandler = require('./handlers/graphql');

const openDatabaseConnection = util.promisify(
  keystone.openDatabaseConnection.bind(keystone)
);
const closeDatabaseConnection = util.promisify(
  keystone.closeDatabaseConnection.bind(keystone)
);

const start = async ({app, pretty}) => {
  const keystoneConfig = require('./config/keystone');
  const port = config.get('PORT');
  const hostUrl = config.get('HOST_URL');

  const server = express();

  keystone.init(keystoneConfig.options);
  keystone.import('models');
  keystone.set('locals', keystoneConfig.locals);
  keystone.set('nav', keystoneConfig.nav);
  keystone.set('auth', (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/sign-in');
    }
  });

  keystone.initDatabaseConfig();
  keystone.initExpressSession();

  server.use(pinoHttp({stream: pretty}));
  server.use(sessionHandler);
  server.use(keystone.session.persist);
  server.use(passportHandler(keystone));

  server.use(express.static('static'));
  server.use('/keystone', keystone.Admin.Server.createStaticRouter(keystone));
  server.use('/keystone', keystone.Admin.Server.createDynamicRouter(keystone));
  server.use('/auth', authenticationHandler);
  server.use('/graphql', graphqlHandler(keystone));

  server.get('/song/:id/*', (req, res) => {
    const {id} = req.params;
    app.render(req, res, '/song', {id});
  });

  server.get('*', app.getRequestHandler());

  await openDatabaseConnection();

  return server.listen(port, () => {
    console.log(`> Ready on ${hostUrl}`);
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
