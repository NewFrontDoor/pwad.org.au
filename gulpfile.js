const {pipeline} = require('stream');
const del = require('del');
const dargs = require('dargs');
const flatten = require('lodash/flatten');
const {series, src, dest, parallel} = require('gulp');
const gulpExeca = require('gulp-execa');
const responsive = require('gulp-responsive');
const execa = require('execa');
const dotenv = require('dotenv');

const now = require('./now.json');

const config = dotenv.config();

const env = Object.assign(now.env, config.parsed);

let pinoColada;

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

const prodDump = task(
  'mongodump',
  dargs({
    uri: env.MONGO_URI
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

exports.compose = parallel(mongo, server);

exports.images = series(cleanImages, images);

exports.default = server;
