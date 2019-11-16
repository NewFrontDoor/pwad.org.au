const keystone = require('keystone');
const passportLocalMongoose = require('passport-local-mongoose');
const transform = require('model-transform');
const {accessibleRecordsPlugin} = require('@casl/mongoose');
const {createAbilities} = require('../handlers/authentication/abilities');

const {Types} = keystone.Field;

const User = new keystone.List('User', {
  track: true
});

User.schema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameUnique: true
});

User.schema.pre('save', function(next) {
  // This needs to be setup before the password field is added
  // otherwise `passport-local-mongoose` won't salt and hash the password
  this.setPassword(this.password, next);
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
    hasFreeAccount: {type: Types.Boolean},
    profilePhoto: {type: Types.Url},
    googleProviderId: {type: Types.Text, noedit: true},
    password: {type: Types.Password, initial: true, required: false}
  },
  'Payment',
  {
    payment: {type: Types.Relationship, ref: 'Payment', noedit: true}
  },
  'Short List',
  {
    hymns: {type: Types.Relationship, ref: 'Hymn', many: true}
  },
  'Permissions',
  {
    isProtected: {type: Boolean, noedit: true},
    role: {
      default: 'public',
      initial: true,
      options: 'admin, committee, public',
      required: true,
      type: Types.Select
    }
  }
);

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(() => {
  return createAbilities(this).can('read', 'keystone');
});

// Check if they've completed a square transaction
User.schema.virtual('hasPaidAccount').get(() => false);

User.schema.methods.wasActive = () => {
  this.lastActiveOn = new Date();
  return this;
};

User.schema.plugin(accessibleRecordsPlugin);

transform.toJSON(User);
User.defaultColumns = 'name, email';
User.register();
