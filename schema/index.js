const {GraphQLString, GraphQLList} = require('graphql');
const {schemaComposer} = require('graphql-compose');
const {
  composeWithMongoose,
  GraphQLMongoID
} = require('graphql-compose-mongoose');
const renderMdx = require('../lib/render-mdx');
const userSchema = require('./user');
const hymnSchema = require('./hymn');

module.exports = keystone => {
  const AuthorTC = composeWithMongoose(keystone.list('Author').model);
  const CategoryTC = composeWithMongoose(keystone.list('Category').model);
  const PrayerTC = composeWithMongoose(keystone.list('Prayer').model);
  const TuneTC = composeWithMongoose(keystone.list('Tune').model);
  const ResourceTC = composeWithMongoose(keystone.list('Resource').model);
  const MenuTC = composeWithMongoose(keystone.list('Menu').model);
  const MetreTC = composeWithMongoose(keystone.list('Metre').model);

  const PageContentTC = composeWithMongoose(keystone.list('PageContent').model);
  const ScriptureTC = composeWithMongoose(keystone.list('Scripture').model);
  const FileTC = composeWithMongoose(keystone.list('File').model);

  const UserTC = userSchema(keystone);
  const HymnTC = hymnSchema(keystone, {AuthorTC, TuneTC, FileTC, MetreTC});

  ScriptureTC.addNestedFields(renderMdx('content.md'));
  PageContentTC.addNestedFields(renderMdx('content.md'));
  PrayerTC.addNestedFields(renderMdx('content.md'));

  TuneTC.addRelation('composer', {
    resolver: () => AuthorTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.composer
    }
  });

  AuthorTC.addRelation('hymns', {
    resolver: () => HymnTC.getResolver('findMany'),
    prepareArgs: {
      filter: source => ({author: source._id})
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
    hymnMany: HymnTC.getResolver('findMany')
      .addFilterArg({
        name: 'title_contains',
        type: GraphQLString,
        query: (query, value, resolveParams) => {
          query.$text = {$search: value};
          resolveParams.args.sort = {
            score: {$meta: 'textScore'}
          };
          resolveParams.projection.score = {$meta: 'textScore'};
        }
      })
      .addFilterArg({
        name: 'includes_metre',
        type: new GraphQLList(GraphQLMongoID),
        query: (query, value) => {
          query.metre = {$in: value};
        }
      }),
    hymnTotal: HymnTC.getResolver('count'),
    hymnConnection: HymnTC.getResolver('connection'),

    scriptureMany: ScriptureTC.getResolver('findMany').addFilterArg({
      name: 'title_contains',
      type: GraphQLString,
      query: (query, value, resolveParams) => {
        query.$text = {$search: value};
        resolveParams.args.sort = {
          score: {$meta: 'textScore'}
        };
        resolveParams.projection.score = {$meta: 'textScore'};
      }
    }),

    tuneById: TuneTC.getResolver('findById'),
    tuneByIds: TuneTC.getResolver('findByIds'),
    tuneOne: TuneTC.getResolver('findOne'),
    tuneMany: TuneTC.getResolver('findMany'),
    tunetotal: TuneTC.getResolver('count'),
    tuneConnection: TuneTC.getResolver('connection'),

    pageContentOne: PageContentTC.getResolver('findOne'),

    prayerMany: PrayerTC.getResolver('findMany'),
    prayerById: PrayerTC.getResolver('findById'),

    resourcesMany: ResourceTC.getResolver('findMany'),
    menuMany: MenuTC.getResolver('findMany'),
    metreMany: MetreTC.getResolver('findMany').addFilterArg({
      name: 'metre_contains',
      type: GraphQLString,
      query: (query, value, resolveParams) => {
        query.$text = {$search: value};
        resolveParams.args.sort = {
          score: {$meta: 'textScore'}
        };
        resolveParams.projection.score = {$meta: 'textScore'};
      }
    }),

    searchPrayer: PrayerTC.getResolver('findMany')
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
