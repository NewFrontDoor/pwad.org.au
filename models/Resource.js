const config = require('config');
const keystone = require('keystone');
const transform = require('model-transform');
const storageAdapterS3 = require('keystone-storage-adapter-s3');

const {Types} = keystone.Field;

const Resource = new keystone.List('Resource', {
  track: true
});

const fileStorage = new keystone.Storage({
  adapter: storageAdapterS3,
  s3: {
    key: config.get('S3_KEY'),
    secret: config.get('S3_SECRET'),
    bucket: config.get('S3_BUCKET'),
    region: config.get('S3_REGION'),
    path: '/resources',
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

Resource.add({
  name: {type: Types.Text, index: true, unique: true, initial: true},
  type: {
    type: Types.Select,
    options: [
      {value: 'url', label: 'URL Resource'},
      {value: 'file', label: 'File Resource'}
    ]
  },
  menu: {type: Types.Relationship, ref: 'Menu'},
  sortOrder: {type: Types.Number, min: 1000, max: 9999},
  file: {
    type: Types.File,
    storage: fileStorage,
    dependsOn: {type: 'file'},
    required: true,
    initial: false
  },
  url: {
    type: Types.Url,
    dependsOn: {type: 'url'},
    required: true,
    initial: false
  }
});

transform.toJSON(Resource);
Resource.defaultColumns = 'name, type, menu, sortOrder';
Resource.register();
