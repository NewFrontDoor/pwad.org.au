const {parallel} = require('gulp');
const nodemon = require('gulp-nodemon');
const {task} = require('gulp-execa');
const execa = require('execa');
const dotenv = require('dotenv');
const waitForLocalhost = require('wait-for-localhost');

const now = require('./now.json');

const config = dotenv.config();

const env = Object.assign(now.env, config.parsed);

let pinoColada;

async function server(done) {
  await waitForLocalhost({port: 27017, useGet: true});
  nodemon({
    script: './app.js',
    ignore: ['.next', 'data', 'node_modules', 'pages', 'components'],
    env,
    stdout: false,
    readable: false,
    done
  }).on('readable', function() {
    if (pinoColada) {
      pinoColada.kill();
    }

    pinoColada = execa('pino-colada');

    pinoColada.stdout.pipe(process.stdout);
    pinoColada.stderr.pipe(process.stderr);

    this.stdout.pipe(pinoColada.stdin);
    this.stderr.pipe(pinoColada.stdin);
  });
}

const mongo = task('docker-compose up mongo');

exports.compose = parallel(mongo, server);

exports.default = server;
