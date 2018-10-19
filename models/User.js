const keystone = require('keystone');
const passportLocalMongoose = require('passport-local-mongoose');
const transform = require('model-transform');

const {Types} = keystone.Field;

const User = new keystone.List('User', {
  track: true
});

User.add(
  {
    name: {type: Types.Name, required: true, index: true},
    email: {
      type: Types.Email,
      initial: true,
      required: true,
      index: true,
      unique: true
    },
    profilePhoto: {type: Types.Url},
    googleProviderId: {type: Types.Text, noedit: true},
    password: {type: Types.Password, initial: true, required: false}
  },
  'Permissions',
  {
    isProtected: {type: Boolean, noedit: true}
  }
);

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(() => true);

User.schema.methods.wasActive = () => {
  this.lastActiveOn = new Date();
  return this;
};

User.schema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameUnique: true
});

transform.toJSON(User);
User.defaultColumns = 'name, email';
User.register();
