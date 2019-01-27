const cors = require('cors');
const config = require('config');

const whitelist = [
  config.get('HOST_URL'),
  'https://pwad.now.sh',
  'https://pwad.org.au'
];

const options = {
  credentials: true,
  origin(origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

module.exports = cors(options);
