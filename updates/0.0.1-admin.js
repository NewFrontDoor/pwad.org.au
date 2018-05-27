const keystone = require('keystone');

const User = keystone.list('User').model;

module.exports = done => {
  new User({
    name: {
      first: 'Demo',
      last: 'User'
    },
    email: 'admin@vision100it.org',
    password: 'admin',
    isAdmin: true,
    isProtected: true
  }).save(done);
};
