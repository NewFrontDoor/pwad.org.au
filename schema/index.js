const {strict: assert} = require('assert');
const {get} = require('lodash');
const {GraphQLString, GraphQLInt, GraphQLBoolean} = require('graphql');
const {truncate} = require('lodash');
const {schemaComposer} = require('graphql-compose');
const {composeWithMongoose} = require('graphql-compose-mongoose');

module.exports = keystone => {
  const {model: UserModel} = keystone.list('User');

  const AuthorTC = composeWithMongoose(keystone.list('Author').model);
  const CategoryTC = composeWithMongoose(keystone.list('Category').model);
  const HymnTC = composeWithMongoose(keystone.list('Hymn').model);
  const TuneTC = composeWithMongoose(keystone.list('Tune').model);
  const ResourceTC = composeWithMongoose(keystone.list('Resource').model);
  const MenuTC = composeWithMongoose(keystone.list('Menu').model);
  const UserTC = composeWithMongoose(UserModel);
  const PageContentTC = composeWithMongoose(keystone.list('PageContent').model);

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

  HymnTC.addNestedFields({
    'lyrics.md': {
      type: GraphQLString,
      args: {
        truncate: GraphQLInt
      },
      resolve(result, args) {
        if (args.truncate) {
          return truncate(result.md, {
            length: args.truncate,
            separator: ' '
          });
        }

        return result.md;
      }
    }
  });

  ResourceTC.addRelation('menu', {
    resolver: () => MenuTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.menu
    }
  });

  ResourceTC.addRelation('content', {
    resolver: () => PageContentTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.content
    }
  });

  MenuTC.addRelation('resources', {
    resolver: () => ResourceTC.getResolver('findMany'),
    prepareArgs: {
      filter: source => ({menu: source._id})
    }
  });

  MenuTC.addRelation('link', {
    resolver: () => PageContentTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.link
    }
  });

  schemaComposer.Query.addFields({
    me: UserTC.getResolver('me'),

    authorById: AuthorTC.getResolver('findById'),
    authorByIds: AuthorTC.getResolver('findByIds'),
    authorOne: AuthorTC.getResolver('findOne'),
    authorMany: AuthorTC.getResolver('findMany'),
    authorTotal: AuthorTC.getResolver('count'),
    authorConnection: AuthorTC.getResolver('connection'),

    categoryById: CategoryTC.getResolver('findById'),
    categoryByIds: CategoryTC.getResolver('findByIds'),
    categoryOne: CategoryTC.getResolver('findOne'),
    categoryMany: CategoryTC.getResolver('findMany'),
    categoryTotal: CategoryTC.getResolver('count'),
    categoryConnection: CategoryTC.getResolver('connection'),

    hymnById: HymnTC.getResolver('findById'),
    hymnByIds: HymnTC.getResolver('findByIds'),
    hymnOne: HymnTC.getResolver('findOne'),
    hymnMany: HymnTC.getResolver('findMany').addFilterArg({
      name: 'title_contains',
      type: GraphQLString,
      query: (query, value) => {
        query.$text = {$search: value};
      }
    }),
    hymnTotal: HymnTC.getResolver('count'),
    hymnConnection: HymnTC.getResolver('connection'),

    tuneById: TuneTC.getResolver('findById'),
    tuneByIds: TuneTC.getResolver('findByIds'),
    tuneOne: TuneTC.getResolver('findOne'),
    tuneMany: TuneTC.getResolver('findMany'),
    tunetotal: TuneTC.getResolver('count'),
    tuneConnection: TuneTC.getResolver('connection'),

    pageContentOne: PageContentTC.getResolver('findOne'),

    resourcesMany: ResourceTC.getResolver('findMany'),
    menuMany: MenuTC.getResolver('findMany')
  });

  schemaComposer.Mutation.addFields({
    createUser: UserTC.getResolver('createUser'),
    loginUser: UserTC.getResolver('loginUser'),
    changePassword: UserTC.getResolver('changePassword'),
    changeFreeAccount: UserTC.getResolver('changeFreeAccount')
  });

  const schema = schemaComposer.buildSchema();

  return schema;
};
