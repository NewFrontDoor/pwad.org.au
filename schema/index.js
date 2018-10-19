const {get} = require('lodash');
const {GraphQLString, GraphQLInt} = require('graphql');
const {truncate} = require('lodash');
const {GQC} = require('graphql-compose');
const {composeWithMongoose} = require('graphql-compose-mongoose');

module.exports = keystone => {
  const AuthorTC = composeWithMongoose(keystone.list('Author').model);
  const CategoryTC = composeWithMongoose(keystone.list('Category').model);
  const HymnTC = composeWithMongoose(keystone.list('Hymn').model);
  const TuneTC = composeWithMongoose(keystone.list('Tune').model);
  const UserTC = composeWithMongoose(keystone.list('User').model);

  UserTC.removeField(['email', 'password']);

  UserTC.addResolver({
    name: 'me',
    type: UserTC,
    resolve(rp) {
      const id = get(rp, 'context.req.user._id', null);
      return keystone.list('User').model.findById(id);
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

  GQC.rootQuery().addFields({
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
    tuneConnection: TuneTC.getResolver('connection')
  });

  const schema = GQC.buildSchema();

  return schema;
};
