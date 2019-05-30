const keystone = require('keystone');

const User = keystone.list('User').model;

module.exports = done => {
  const user = new User({
    name: {
      first: 'Demo',
      last: 'User'
    },
    email: 'admin@vision100it.org',
    role: 'admin',
    isProtected: true
  });

  User.register(user, 'admin')
    .then(() => done())
    .catch(error => done(error));
};
