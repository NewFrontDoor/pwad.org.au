const {promisify} = require('util');
let {pipeline} = require('stream');
const {ManagementClient} = require('auth0');
const {Password} = require('enquirer');
const {series, src, dest} = require('gulp');
const concat = require('gulp-concat');
const Conf = require('conf');
const dargs = require('dargs');
const del = require('del');
const dotenv = require('dotenv');
const File = require('vinyl');
const flatten = require('lodash/flatten');
const gulpExeca = require('gulp-execa');
const PluginError = require('plugin-error');
const responsive = require('gulp-responsive');
const through = require('through2');

const {loadKdbx, readEnvEntries} = require('./keypass');
const now = require('./now.json');

pipeline = promisify(pipeline);

const config = new Conf({
  cwd: '.',
  defaults: {
    keypassFile: 'path to your keybase file'
  }
});

const prompt = new Password({
  name: 'password',
  message: 'What is the keybase password?'
});

function task(...args) {
  return gulpExeca.task(flatten(args).join(' '));
}

const mongo = task(
  'docker-compose',
  'up',
  dargs({
    _: ['mongo'],
    detach: true
  })
);

const x1 = {suffix: '@1x'};
const x2 = {suffix: '@2x'};

const mobileImageWidth = 512;
const tabletImageWidth = 768;
const desktopImageWidth = 1024;

const mobile = {
  width: mobileImageWidth,
  rename: rename => rename
};

const tablet = {
  width: tabletImageWidth,
  rename: ({suffix, ...rest}) => ({
    suffix: `-medium${suffix}`,
    ...rest
  })
};

const desktop = {
  width: desktopImageWidth,
  rename: ({suffix, ...rest}) => ({
    suffix: `-wide${suffix}`,
    ...rest
  })
};

const portrait = ({width, ...rest}) => ({
  ...rest,
  width,
  height: width * (16 / 9)
});

const landscape = ({width, ...rest}) => ({
  ...rest,
  width,
  height: width * (9 / 16)
});

const regular = ({rename, ...rest}) => ({
  ...rest,
  rename: rename(x1)
});

const retina = ({rename, width, height, ...rest}) => ({
  ...rest,
  width: width * 2,
  height: height ? height * 2 : height,
  quality: 40,
  rename: rename(x2)
});

const grayscale = rest => ({
  ...rest,
  grayscale: true
});

const banners = [
  grayscale(regular(portrait(mobile))),
  grayscale(retina(portrait(mobile))),
  grayscale(regular(landscape(tablet))),
  grayscale(retina(landscape(tablet))),
  grayscale(regular(landscape(desktop))),
  grayscale(retina(landscape(desktop)))
];

function images() {
  return pipeline(
    src('./assets/**/*.jpg'),
    responsive({
      'banners/brown-book-page.jpg': banners,
      'banners/brown-wooden-church-bench.jpg': banners,
      'banners/brown-wooden-church-pew.jpg': banners,
      'banners/church-under-blue-sky.jpg': banners
    }),
    dest('static')
  );
}

function cleanImages() {
  return del('static/banners');
}

async function setupEnv() {
  const keypassFile = config.get('keypassFile');
  const password = await prompt.run();

  return pipeline(
    src(keypassFile),
    loadKdbx(password),
    await readEnvEntries(),
    concat('.env'),
    dest('.')
  );
}

function isSecret(value) {
  return value.startsWith('@');
}

function parseEnv() {
  return through.obj(function(file, _, cb) {
    if (file.isBuffer()) {
      const env = dotenv.parse(file.contents);
      for (const [key, secret] of Object.entries(now.env)) {
        if (isSecret(secret)) {
          const newKey = secret.replace('@', '');
          const newValue = env[key];

          if (newValue) {
            this.push(
              new File({
                path: newKey,
                contents: Buffer.from(newValue)
              })
            );
          }
        }
      }
    } else {
      this.emit(
        'error',
        new PluginError('parse-env', 'env file was not found')
      );
    }

    cb();
  });
}

function replaceSecret() {
  return through.obj(async function(file, _, cb) {
    try {
      await gulpExeca.exec(`now secrets remove --yes ${file.path}`, {
        reject: false
      });
      await gulpExeca.exec(`now secrets add ${file.path} "${file.contents}"`);
      cb();
    } catch (error) {
      cb(error);
    }
  });
}

function updateNowEnv() {
  return pipeline(src('.env'), parseEnv(), replaceSecret());
}

async function copyAppMetadata() {
  const management = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: 'read:users update:users update:users_app_metadata'
  });

  const email = '';

  const users = await management.getUsersByEmail(email);

  const dbUser = users.find(user => user.user_id.startsWith('auth0'));
  const googleUser = users.find(user =>
    user.user_id.startsWith('google-oauth2')
  );

  console.log({dbUser, googleUser});

  if (dbUser.app_metadata) {
    await management.updateAppMetadata(
      {id: googleUser.user_id},
      dbUser.app_metadata
    );
  }
}

const prodDump = task(
  'mongodump',
  dargs({
    uri: process.env.MONGO_URI
  })
);

const localRestore = task(
  'mongorestore',
  dargs(
    {
      drop: true,
      uri: 'mongodb://localhost:27017/pwad',
      nsFrom: 'pwad-stage.*',
      nsTo: 'pwad.*'
    },
    {
      allowCamelCase: true
    }
  )
);

const devRestore = series(mongo, localRestore);

exports.prodDump = prodDump;
exports.devRestore = devRestore;

exports.prodcopy = series(prodDump, devRestore);

exports.images = series(cleanImages, images);

exports.copyAppMetadata = copyAppMetadata;
exports.updateNowEnv = series(setupEnv, updateNowEnv);
exports.setupEnv = series(setupEnv);
