const config = require('config');
const keystone = require('keystone');
const transform = require('model-transform');
const storageAdapterS3 = require('../lib/s3-adapter');

const fileStorage = new keystone.Storage({
  adapter: storageAdapterS3,
  s3: {
    key: config.get('S3_KEY'),
    secret: config.get('S3_SECRET'),
    bucket: config.get('S3_BUCKET'),
    region: config.get('S3_REGION'),
    path: '/files',
    publicUrl: config.get('CLOUDFRONT_PUBLIC_URL'),
    generateFilename: file => file.originalname.replace(/ /g, '-')
  },
  schema: {
    bucket: true,
    etag: true,
    path: true,
    url: true
  }
});

const {Types} = keystone.Field;

const File = new keystone.List('File');

File.add({
  file: {
    type: Types.File,
    storage: fileStorage,
    initial: true
  }
});

transform.toJSON(File);
File.defaultColumns = 'file';
File.register();
