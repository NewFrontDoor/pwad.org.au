const next = require('next');
const pinoColada = require('pino-colada');
const config = require('config');
const {start, stop} = require('./server');

let pretty;
let server;

const app = next({dev: config.dev});

if (config.dev) {
  pretty = pinoColada();
  pretty.pipe(process.stdout);
}

module.exports = app
  .prepare()
  .then(async () => {
    server = await start({
      pretty,
      handle: app.getRequestHandler()
    });
  })
  .catch(err => console.error(err));

process.once('SIGUSR2', () => {
  stop(server).then(() => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
