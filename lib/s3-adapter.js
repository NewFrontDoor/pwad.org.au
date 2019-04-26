/*
TODO
- Check whether files exist before uploading (will always overwrite as-is)
- Support multiple retry attempts if a file exists (see FS Adapter)
*/

// Mirroring keystone 4's support of node v6.
const fs = require('fs');
const pathlib = require('path');
const assign = require('object-assign');
const debug = require('debug')('keystone-s3');
const ensureCallback = require('keystone-storage-namefunctions/ensureCallback');
const nameFunctions = require('keystone-storage-namefunctions');
const S3 = require('aws-sdk/clients/s3');

const DEFAULT_OPTIONS = {
  key: process.env.S3_KEY,
  secret: process.env.S3_SECRET,
  bucket: process.env.S3_BUCKET,
  region: process.env.S3_REGION || 'us-east-1',
  path: '/',
  generateFilename: nameFunctions.randomFilename,
  uploadParams: {}
};

function ensureLeadingSlash(filename) {
  return filename[0] === '/' ? filename : '/' + filename;
}

function removeLeadingSlash(filename) {
  return filename[0] === '/' ? filename.substring(1) : filename;
}

// This constructor is usually called indirectly by the Storage class
// in keystone.

// S3-specific options should be specified in an `options.s3` field,
// which can contain the following options: { key, secret, bucket, region,
// path, uploadParams, publicUrl }.

// The schema can contain the additional fields { path, bucket, etag }.

// See README.md for details and usage examples.

function S3Adapter(options) {
  const self = this;
  this.options = assign({}, DEFAULT_OPTIONS, options.s3);

  // Check required options are set.
  const requiredOptions = ['key', 'secret', 'bucket'];
  requiredOptions.forEach(key => {
    if (!self.options[key]) {
      throw new Error(
        'Configuration error: Missing required option `' + key + '`'
      );
    }
  });

  // Check that `uploadParams` does not include any that we will be setting.
  const restrictedPrams = [
    'Key',
    'Body',
    'Bucket',
    'ContentType',
    'ContentLength'
  ];
  Object.keys(this.options.uploadParams).forEach(key => {
    if (restrictedPrams.indexOf(key) !== -1) {
      throw new Error(
        'Configuration error: `' + key + '` must not be set on `uploadParams`.'
      );
    }
  });

  // Ensure the path has a leading "/"
  this.options.path = ensureLeadingSlash(this.options.path);

  // Create the s3 client
  this.s3Client = new S3({
    accessKeyId: this.options.key,
    secretAccessKey: this.options.secret,
    region: this.options.region
  });

  // Ensure the generateFilename option takes a callback
  this.options.generateFilename = ensureCallback(this.options.generateFilename);
}

S3Adapter.compatibilityLevel = 1;

// All the extra schema fields supported by this adapter.
S3Adapter.SCHEMA_TYPES = {
  filename: String,
  bucket: String,
  path: String,
  etag: String
};

S3Adapter.SCHEMA_FIELD_DEFAULTS = {
  filename: true,
  bucket: false,
  path: false,
  etag: false
};

S3Adapter.prototype._resolveBucket = function(file) {
  if (file && file.bucket) {
    return file.bucket;
  }

  return this.options.bucket;
};

S3Adapter.prototype._resolvePath = function(file) {
  // Just like the bucket, the schema can store the path for files. If the path
  // isn't stored we'll assume all the files are in the path specified in the
  // s3.path option which defaults to the root of the bucket.
  const path = (file && file.path) || this.options.path;
  // We still need to ensureLeadingSlash here as older versions of this
  // adapter did not so there may be bad data for file.path in the DB.
  return ensureLeadingSlash(path);
};

// Get the absolute path name for the specified file.
S3Adapter.prototype._resolveAbsolutePath = function(file) {
  const path = this._resolvePath(file);
  return pathlib.posix.resolve(path, file.filename);
};

S3Adapter.prototype.uploadFile = function(file, callback) {
  const self = this;
  this.options.generateFilename(file, 0, (err, filename) => {
    if (err) return callback(err);

    // The expanded path of the file on the filesystem.
    const localpath = file.path;
    // Grab the mimetype so we can set ContentType in S3
    const {mimetype} = file;
    // Grab the size so we can set ContentLength
    const filesize = file.size;

    // The destination path inside the S3 bucket.
    file.path = self.options.path;
    file.filename = filename;
    const absolutePath = self._resolveAbsolutePath(file);
    const bucket = self._resolveBucket();

    debug(
      'Uploading file "%s" to "%s" bucket with mimetype "%s"',
      absolutePath,
      bucket,
      mimetype
    );

    const fileStream = fs.createReadStream(localpath);
    fileStream.on('error', err => {
      if (err) return callback(err);
    });

    const params = assign(
      {
        Key: removeLeadingSlash(absolutePath),
        Body: fileStream,
        Bucket: bucket,
        ContentType: mimetype,
        ContentLength: filesize
      },
      self.options.uploadParams
    );

    self.s3Client.upload(params, (err, data) => {
      if (err) return callback(err);
      // We'll annotate the file with a bunch of extra properties. These won't
      // be saved in the database unless the corresponding schema options are
      // set.
      file.filename = filename;
      // NOTE: The etag is double-quoted. This is correct because an ETag
      // according to the spec is either a quoted-string or W/ followed by
      // a quoted-string (so, for example W/"asdf" is a valid etag).
      // https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.11
      file.etag = data.ETag;

      // File.url is automatically populated by keystone's Storage class so we
      // don't need to set it here.

      // The path and bucket can be stored on a per-file basis if you want.
      // The effect of this is that you can have some (eg, old) files in your
      // collection stored in different bucket / different path inside your
      // bucket. This means you can do slow data migrations. Note that if you
      // *don't* store these values you can arguably migrate your data more
      // easily - just move it all, reconfigure and restart your server.
      file.path = self.options.path;
      file.bucket = self.options.bucket;

      debug('file upload successful %s', absolutePath);
      callback(null, file);
    });
  });
};

// Note that this will provide a public URL for the file, but it will only
// work if:
// - the bucket is public (best) or
// - the file is set to a canned ACL (ie, uploadParams:{ ACL: 'public-read' } )
// - you pass credentials during your request for the file content itself
S3Adapter.prototype.getFileURL = function(file) {
  const absolutePath = this._resolveAbsolutePath(file);
  const path = this._resolvePath(file);
  const bucket = this._resolveBucket(file);

  if (typeof this.options.publicUrl === 'string') {
    return this.options.publicUrl + absolutePath;
  }

  if (typeof this.options.publicUrl === 'function') {
    file.path = path; // Make sure path is available on the file
    file.bucket = bucket; // Make sure bucket is available on the file
    return this.options.publicUrl(file);
  }

  return 'https://' + bucket + '.s3.amazonaws.com' + absolutePath;
};

S3Adapter.prototype.removeFile = function(file, callback) {
  const absolutePath = this._resolveAbsolutePath(file);
  const bucket = this._resolveBucket(file);

  debug('Removing file "%s" from "%s" bucket', absolutePath, bucket);

  const params = {
    Key: removeLeadingSlash(absolutePath),
    Bucket: bucket
  };

  this.s3Client.deleteObject(params, err => {
    if (err) return callback(err);
    callback();
  });
};

// Check if a file with the specified filename already exists. Callback called
// with the file headers if the file exists, null otherwise.
S3Adapter.prototype.fileExists = function(filename, callback) {
  const absolutePath = this._resolveAbsolutePath({filename});
  const bucket = this._resolveBucket();

  debug('Checking file exists "%s" in "%s" bucket', absolutePath, bucket);

  const params = {
    Key: removeLeadingSlash(absolutePath),
    Bucket: bucket
  };

  this.s3Client.getObject(params, (err, data) => {
    if (err) return callback(err);
    callback(null, data);
  });
};

module.exports = S3Adapter;
