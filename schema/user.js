const {strict: assert} = require('assert');
const {GraphQLBoolean, GraphQLString} = require('graphql');
const {
  composeWithMongoose,
  GraphQLMongoID
} = require('graphql-compose-mongoose');

function userSchema(keystone, {HymnTC}, options) {
  const {model: UserModel} = keystone.list('User');
  const UserTC = composeWithMongoose(UserModel, {
    ...options,
    fields: {
      remove: ['email', 'password', 'hash', 'salt', 'googleProviderId']
    }
  });

  UserTC.addFields({
    hasFreeAccount: {
      type: GraphQLBoolean
    },
    hasPaidAccount: {
      type: GraphQLBoolean
    }
  });

  UserTC.addRelation('shortlist', {
    resolver: () => HymnTC.getResolver('findByIds'),
    prepareArgs: {
      _ids: source => source.hymns || []
    },
    projection: {hymns: true}
  });

  UserTC.addResolver({
    name: 'me',
    type: UserTC,
    async resolve({context: {user}}) {
      return user;
    }
  });

  UserTC.addResolver({
    name: 'createUser',
    type: UserTC,
    args: {
      firstName: GraphQLString,
      lastName: GraphQLString,
      email: GraphQLString,
      password: GraphQLString,
      confirmPassword: GraphQLString
    },
    async resolve({args, context}) {
      const {firstName, lastName, email, password, confirmPassword} = args;
      const name = {first: firstName, last: lastName};

      try {
        assert.strictEqual(
          password,
          confirmPassword,
          'Confirm password does not match'
        );

        const user = new UserModel({email, name});
        await UserModel.register(user, password);
        await context.login(user);
        return user;
      } catch (error) {
        context.log.error(error);
        throw new Error('Email / Password Incorrect');
      }
    }
  });

  UserTC.addResolver({
    name: 'loginUser',
    type: UserTC,
    args: {
      email: GraphQLString,
      password: GraphQLString
    },
    async resolve({args, context}) {
      const {email, password} = args;

      try {
        assert.ok(password);
        const found = await UserModel.findByUsername(email);
        const {user, error} = await found.authenticate(password);

        if (user) {
          await context.login(user);
          return user;
        }

        throw error;
      } catch (error) {
        context.log.error(error);
        throw new Error('Email / Password Incorrect');
      }
    }
  });

  UserTC.addResolver({
    name: 'changeFreeAccount',
    type: UserTC,
    args: {
      hasFreeAccount: 'Boolean!'
    },
    async resolve({args, context}) {
      const {user} = context;
      const {hasFreeAccount} = args;

      try {
        await user.set({hasFreeAccount}).save();
        return user;
      } catch (error) {
        context.log.error(error);
        throw new Error('Unable to update user');
      }
    }
  });

  UserTC.addResolver({
    name: 'changePassword',
    type: UserTC,
    args: {
      password: GraphQLString,
      newPassword: GraphQLString,
      confirmPassword: GraphQLString
    },
    async resolve({args, context}) {
      const {user} = context;
      const {password, newPassword, confirmPassword} = args;

      assert.strictEqual(
        newPassword,
        confirmPassword,
        'Confirm password does not match'
      );
      await user.changePassword(password, newPassword);
      return user;
    }
  });

  UserTC.addResolver({
    name: 'addShortListItem',
    type: UserTC,
    args: {
      hymn: GraphQLMongoID
    },
    async resolve({args, context}) {
      const {user} = context;
      const {hymn} = args;

      return UserModel.findOneAndUpdate(
        {_id: user._id},
        {
          $addToSet: {
            hymns: hymn
          }
        },
        {new: true}
      ).exec();
    }
  });

  UserTC.addResolver({
    name: 'removeShortListItem',
    type: UserTC,
    args: {
      hymn: GraphQLMongoID
    },
    async resolve({args, context}) {
      const {user} = context;
      const {hymn} = args;

      return UserModel.findOneAndUpdate(
        {_id: user._id},
        {
          $pull: {
            hymns: hymn
          }
        },
        {new: true}
      ).exec();
    }
  });

  return UserTC;
}

module.exports = userSchema;
