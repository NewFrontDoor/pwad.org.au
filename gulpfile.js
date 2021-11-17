/* eslint camelcase: "warn" */

const {promisify} = require('util');
let {pipeline} = require('stream');
const {ManagementClient} = require('auth0');
const {series, src, dest} = require('gulp');
const del = require('del');
const responsive = require('gulp-responsive');

pipeline = promisify(pipeline);

const x1 = {suffix: '@1x'};
const x2 = {suffix: '@2x'};

const mobileImageWidth = 512;
const tabletImageWidth = 768;
const desktopImageWidth = 1024;

const mobile = {
  width: mobileImageWidth,
  rename: (rename) => rename
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

const grayscale = (rest) => ({
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

const management = new ManagementClient({
  domain: process.env.AUTH0_ISSUER_BASE_URL,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'read:users update:users update:users_app_metadata'
});

async function updateUser() {
  await management.updateUser(
    {id: 'auth0|ID'},
    {
      given_name: '',
      family_name: ''
    }
  );
}

exports.images = series(cleanImages, images);

exports.updateUser = updateUser;
