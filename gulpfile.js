const {pipeline} = require('stream');
const del = require('del');
const dargs = require('dargs');
const flatten = require('lodash/flatten');
const {series, src, dest} = require('gulp');
const execa = require('execa');
const {Password} = require('enquirer');
const gulpExeca = require('gulp-execa');
const responsive = require('gulp-responsive');
const {ManagementClient} = require('auth0');
const Conf = require('conf');

const {
  loadKdbx,
  saveKdbx,
  readEntriesFromKdbx,
  writeEntriesToKdbx
} = require('./keypass');
const now = require('./now.json');

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

function images(done) {
  return pipeline(
    src('./assets/**/*.jpg'),
    responsive({
      'banners/brown-book-page.jpg': banners,
      'banners/brown-wooden-church-bench.jpg': banners,
      'banners/brown-wooden-church-pew.jpg': banners,
      'banners/church-under-blue-sky.jpg': banners
    }),
    dest('static'),
    done
  );
}

function cleanImages() {
  return del('static/banners');
}

async function setupEnv() {
  const keypassFile = config.get('keypassFile');
  console.log(keypassFile);
  const password = await prompt.run();
  const db = await loadKdbx({
    password,
    keypassFile
  });
  return readEntriesFromKdbx(db);
}

async function updateEnv() {
  const keypassFile = config.get('keypassFile');
  const password = await prompt.run();
  const db = await loadKdbx({
    password,
    keypassFile
  });
  await writeEntriesToKdbx(db);
  await saveKdbx({
    db,
    keypassFile
  });
}

function isSecret(value) {
  return value.startsWith('@');
}

async function updateNowEnv() {
  const {env} = now;

  for await (const [key, secret] of Object.entries(env)) {
    if (isSecret(secret)) {
      const newKey = secret.replace('@', '');
      const newValue = config.parsed[key];
      console.log(secret, newValue);

      await execa('now', ['secrets', 'add', newKey, newValue]);
    }
  }
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
exports.updateNowEnv = updateNowEnv;
exports.setupEnv = series(setupEnv);
exports.updateEnv = series(updateEnv);
