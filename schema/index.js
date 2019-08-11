const mongoose = require('mongoose');
const {GraphQLString} = require('graphql');
const {schemaComposer} = require('graphql-compose');
const {
  GraphQLMongoID,
  composeWithMongoose
} = require('graphql-compose-mongoose');
const renderMdx = require('../lib/render-mdx');
const userSchema = require('./user');
const hymnSchema = require('./hymn');

const defaultOptions = {
  resolvers: {
    findByIds: {
      limit: {
        defaultValue: 20
      }
    },
    findMany: {
      limit: {
        defaultValue: 20
      }
    },
    updateMany: {
      limit: {
        defaultValue: 20
      }
    }
  }
};

module.exports = keystone => {
  const {model: Hymn} = keystone.list('Hymn');

  const AuthorTC = composeWithMongoose(
    keystone.list('Author').model,
    defaultOptions
  );
  const CategoryTC = composeWithMongoose(
    keystone.list('Category').model,
    defaultOptions
  );
  const PrayerTC = composeWithMongoose(
    keystone.list('Prayer').model,
    defaultOptions
  );
  const TuneTC = composeWithMongoose(
    keystone.list('Tune').model,
    defaultOptions
  );
  const ResourceTC = composeWithMongoose(
    keystone.list('Resource').model,
    defaultOptions
  );
  const MenuTC = composeWithMongoose(
    keystone.list('Menu').model,
    defaultOptions
  );
  const MetreTC = composeWithMongoose(
    keystone.list('Metre').model,
    defaultOptions
  );

  const PageContentTC = composeWithMongoose(
    keystone.list('PageContent').model,
    defaultOptions
  );
  const ScriptureTC = composeWithMongoose(
    keystone.list('Scripture').model,
    defaultOptions
  );
  const FileTC = composeWithMongoose(
    keystone.list('File').model,
    defaultOptions
  );

  const UserTC = userSchema(keystone, defaultOptions);
  const HymnTC = hymnSchema(
    keystone,
    {AuthorTC, TuneTC, FileTC, MetreTC},
    defaultOptions
  );

  ScriptureTC.addNestedFields(renderMdx('content.md'));
  PageContentTC.addNestedFields(renderMdx('content.md'));
  PrayerTC.addNestedFields(renderMdx('content.md'));

  TuneTC.addRelation('composer', {
    resolver: () => AuthorTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.composer
    }
  });

  TuneTC.addRelation('metre', {
    resolver: () => MetreTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.metre
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

    categoryById: CategoryTC.getResolver('findById'),
    categoryByIds: CategoryTC.getResolver('findByIds'),
    categoryOne: CategoryTC.getResolver('findOne'),
    categoryMany: CategoryTC.getResolver('findMany'),

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
        type: [GraphQLMongoID],
        query: (query, value) => {
          query['tune.metre'] = {$in: value};
        }
      })
      .wrapResolve(() => async ({args}) => {
        const {filter, limit} = args;
        console.log(args);

        const query = Hymn.aggregate();

        if (filter.title_contains) {
          query.match({
            $text: {$search: filter.title_contains}
          });
        }

        if (filter.book) {
          query.match({
            book: {$eq: filter.book}
          });
        }

        if (filter.tune) {
          query.match({
            tune: {$eq: new mongoose.Types.ObjectId(filter.tune)}
          });
        }

        query
          .lookup({
            from: 'tunes',
            localField: 'tune',
            foreignField: '_id',
            as: 'tune'
          })
          .unwind('tune');

        if (filter.includes_metre) {
          query.match({
            'tune.metre': {
              $in: filter.includes_metre.map(
                id => new mongoose.Types.ObjectId(id)
              )
            }
          });
        }

        const result = await query.limit(limit).exec();

        return result;
      }),

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
    tuneMany: TuneTC.getResolver('findMany').addFilterArg({
      name: 'tune_contains',
      type: GraphQLString,
      query: (query, value) => {
        query.title = {$regex: value, $options: '$i'};
      }
    }),
    pageContentOne: PageContentTC.getResolver('findOne'),

    prayerMany: PrayerTC.getResolver('findMany'),
    prayerById: PrayerTC.getResolver('findById'),

    resourcesMany: ResourceTC.getResolver('findMany'),
    menuMany: MenuTC.getResolver('findMany'),
    metreMany: MetreTC.getResolver('findMany').addFilterArg({
      name: 'metre_contains',
      type: GraphQLString,
      query: (query, value) => {
        query.metre = {$regex: value, $options: '$i'};
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
