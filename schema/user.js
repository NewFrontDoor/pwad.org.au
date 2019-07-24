const {strict: assert} = require('assert');
const {get} = require('lodash');
const {GraphQLBoolean} = require('graphql');
const {composeWithMongoose} = require('graphql-compose-mongoose');

function userSchema(keystone) {
  const {model: UserModel} = keystone.list('User');
  const UserTC = composeWithMongoose(UserModel);

  UserTC.removeField(['email', 'password']);

  UserTC.addFields({
    hasFreeAccount: {
      type: GraphQLBoolean
    },
    hasPaidAccount: {
      type: GraphQLBoolean
    }
  });

  UserTC.addResolver({
    name: 'me',
    type: UserTC,
    resolve({context}) {
      const id = get(context, 'user._id', null);
      return UserModel.findById(id);
    }
  });

  UserTC.addResolver({
    name: 'createUser',
    type: UserTC,
    args: {
      firstName: 'String!',
      lastName: 'String!',
      email: 'String!',
      password: 'String!',
      confirmPassword: 'String!'
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
      email: 'String!',
      password: 'String!'
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
      password: 'String!',
      newPassword: 'String!',
      confirmPassword: 'String!'
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

  return UserTC;
}

module.exports = userSchema;
