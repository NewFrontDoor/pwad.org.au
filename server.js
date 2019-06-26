const util = require('util');
const express = require('express');
const keystone = require('keystone');
const pinoHttp = require('pino-http');
const config = require('config');

const corsHandler = require('./handlers/cors');
const authenticationHandler = require('./handlers/authentication');
const passportHandler = require('./handlers/passport');
const graphqlHandler = require('./handlers/graphql');
const keystoneHandler = require('./handlers/keystone');

const openDatabaseConnection = util.promisify(
  keystone.openDatabaseConnection.bind(keystone)
);
const closeDatabaseConnection = util.promisify(
  keystone.closeDatabaseConnection.bind(keystone)
);

const start = async ({app}) => {
  const keystoneConfig = require('./config/keystone');
  const port = config.get('PORT');
  const hostUrl = config.get('HOST_URL');

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
      res.redirect('/sign-in');
    }
  });

  keystone.initDatabaseConfig();
  keystone.initExpressSession(require('mongoose'));

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

  server.get('/song/:id/*', (req, res) => {
    const {id} = req.params;
    app.render(req, res, '/song', {id});
  });

  server.get('/content/:page', (req, res) => {
    const {page} = req.params;
    app.render(req, res, '/content', {page});
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
