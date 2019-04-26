const config = require('config');
const keystone = require('keystone');
const transform = require('model-transform');
const storageAdapterS3 = require('../lib/s3-adapter');

const resourceStorage = new keystone.Storage({
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

const {Types} = keystone.Field;

const Resource = new keystone.List('Resource', {
  sortable: true,
  track: true
});

Resource.add({
  name: {type: Types.Text, index: true, unique: true, initial: true},
  type: {
    type: Types.Select,
    options: [
      {value: 'url', label: 'URL Resource'},
      {value: 'file', label: 'File Resource'},
      {value: 'page', label: 'Page Resource'}
    ]
  },
  menu: {type: Types.Relationship, ref: 'Menu'},
  file: {
    type: Types.File,
    storage: resourceStorage,
    dependsOn: {type: 'file'},
    initial: false
  },
  url: {
    type: Types.Url,
    dependsOn: {type: 'url'},
    initial: false
  },
  content: {
    type: Types.Relationship,
    ref: 'PageContent',
    dependsOn: {type: 'page'},
    initial: false
  }
});

Resource.schema.pre('save', function(next) {
  if (this.type !== 'url') {
    this.url = null;
  }

  if (this.type !== 'file') {
    this.file = null;
  }

  if (this.type !== 'page') {
    this.content = null;
  }

  return next();
});

transform.toJSON(Resource);
Resource.defaultColumns = 'name, type, menu';
Resource.register();
