const next = require('next');
const config = require('config');
const {start, stop} = require('./server');

let server;

const dev = config.get('dev');
const app = next({dev});

module.exports = app
  .prepare()
  .then(async () => {
    server = await start({
      app
    });
  })
  .catch(error => console.error(error));

process.once('SIGINT', async () => {
  try {
    await stop(server);
    process.kill(process.pid, 'SIGINT');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
