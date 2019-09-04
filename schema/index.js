const {GraphQLString, GraphQLFloat, GraphQLList} = require('graphql');
const {schemaComposer} = require('graphql-compose');
const {
  composeWithMongoose,
  GraphQLMongoID
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
  const {model: Occasion} = keystone.list('Occasion');
  const {model: Prayer} = keystone.list('Prayer');
  const {model: Liturgy} = keystone.list('Liturgy');

  const AuthorTC = composeWithMongoose(
    keystone.list('Author').model,
    defaultOptions
  );
  const CategoryTC = composeWithMongoose(
    keystone.list('Category').model,
    defaultOptions
  );
  const PrayerTC = composeWithMongoose(Prayer, defaultOptions);
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
  const OccasionTC = composeWithMongoose(Occasion, defaultOptions);
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
  const KeywordTC = composeWithMongoose(
    keystone.list('Keyword').model,
    defaultOptions
  );
  const CopyrightTC = composeWithMongoose(
    keystone.list('Copyright').model,
    defaultOptions
  );
  const LiturgyTC = composeWithMongoose(Liturgy, defaultOptions);

  const HymnTC = hymnSchema(
    keystone,
    {AuthorTC, TuneTC, FileTC, KeywordTC, CopyrightTC, OccasionTC},
    defaultOptions
  );

  const UserTC = userSchema(keystone, {HymnTC}, defaultOptions);

  ScriptureTC.addNestedFields(renderMdx('content.md')).addFields({
    score: {
      type: GraphQLFloat,
      resolve(args) {
        return args.get('score') || 0;
      }
    }
  });
  PageContentTC.addNestedFields(renderMdx('content.md')).addFields({
    score: {
      type: GraphQLFloat,
      resolve(args) {
        return args.get('score') || 0;
      }
    }
  });
  PrayerTC.addNestedFields(renderMdx('content.md')).addFields({
    score: {
      type: GraphQLFloat,
      resolve(args) {
        return args.get('score') || 0;
      }
    }
  });
  LiturgyTC.addNestedFields(renderMdx('content.md')).addFields({
    score: {
      type: GraphQLFloat,
      resolve(args) {
        return args.get('score') || 0;
      }
    }
  });

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

  OccasionTC.addRelation('parent', {
    resolver: () => OccasionTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.parent
    }
  });

  OccasionTC.addRelation('hymns', {
    resolver: () => HymnTC.getResolver('findMany'),
    prepareArgs: {
      filter: source => ({occasions: source._id})
    }
  });

  KeywordTC.addRelation('hymns', {
    resolver: () => HymnTC.getResolver('findMany'),
    prepareArgs: {
      filter: source => ({keywords: source._id})
    }
  });

  KeywordTC.addRelation('prayers', {
    resolver: () => PrayerTC.getResolver('findMany'),
    prepareArgs: {
      filter: source => ({keywords: source._id})
    }
  });

  KeywordTC.addRelation('liturgies', {
    resolver: () => LiturgyTC.getResolver('findMany'),
    prepareArgs: {
      filter: source => ({keywords: source._id})
    }
  });

  PrayerTC.addRelation('keywords', {
    resolver: () => KeywordTC.getResolver('findByIds'),
    prepareArgs: {
      _ids: source => source.keywords || []
    },
    projection: {keywords: true}
  });

  LiturgyTC.addRelation('keywords', {
    resolver: () => KeywordTC.getResolver('findByIds'),
    prepareArgs: {
      _ids: source => source.keywords || []
    },
    projection: {keywords: true}
  });

  MetreTC.addRelation('tunes', {
    resolver: () => TuneTC.getResolver('findMany'),
    prepareArgs: {
      filter: source => ({metre: source._id})
    }
  });

  TuneTC.addRelation('musicCopyright', {
    resolver: () => CopyrightTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.musicCopyright
    }
  });

  PrayerTC.addRelation('copyright', {
    resolver: () => CopyrightTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.copyright
    }
  });

  LiturgyTC.addRelation('copyright', {
    resolver: () => CopyrightTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.copyright
    }
  });

  const OccasionGroupedByIdTC = schemaComposer.createObjectTC({
    name: 'OccasionGroupedById',
    fields: {
      _id: {type: GraphQLMongoID},
      name: {type: GraphQLString},
      values: {type: new GraphQLList(OccasionTC.getType())}
    }
  });

  OccasionTC.addResolver({
    name: 'occasionManyGroupById',
    type: [OccasionGroupedByIdTC],
    async resolve() {
      return Occasion.aggregate()
        .lookup({
          from: 'occasions',
          localField: 'parent',
          foreignField: '_id',
          as: 'group'
        })
        .unwind({
          path: '$group',
          preserveNullAndEmptyArrays: true
        })
        .group({
          _id: '$group._id',
          name: {$first: '$group.name'},
          values: {$push: {name: '$name', _id: '$_id'}}
        })
        .exec();
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

    occasionById: OccasionTC.getResolver('findById'),
    occasionByIds: OccasionTC.getResolver('findByIds'),
    occasionOne: OccasionTC.getResolver('findOne'),
    occasionMany: OccasionTC.getResolver('findMany'),
    occasionManyGroupById: OccasionTC.getResolver('occasionManyGroupById'),

    keywordById: KeywordTC.getResolver('findById'),
    keywordByIds: KeywordTC.getResolver('findByIds'),
    keywordOne: KeywordTC.getResolver('findOne'),
    keywordMany: KeywordTC.getResolver('findMany').addFilterArg({
      name: 'text_contains',
      type: GraphQLString,
      query: (query, value, resolveParams) => {
        query.$text = {$search: value};
        resolveParams.args.sort = {
          score: {$meta: 'textScore'}
        };
        resolveParams.projection.score = {$meta: 'textScore'};
      }
    }),

    liturgyById: LiturgyTC.getResolver('findById'),
    liturgyByIds: LiturgyTC.getResolver('findByIds'),
    liturgyOne: LiturgyTC.getResolver('findOne'),
    liturgyMany: LiturgyTC.getResolver('findMany').addFilterArg({
      name: 'text_contains',
      type: GraphQLString,
      query: (query, value, resolveParams) => {
        query.$text = {$search: value};
        resolveParams.args.sort = {
          score: {$meta: 'textScore'}
        };
        resolveParams.projection.score = {$meta: 'textScore'};
      }
    }),

    hymnById: HymnTC.getResolver('findById'),
    hymnByIds: HymnTC.getResolver('findByIds'),
    hymnOne: HymnTC.getResolver('findOne'),
    hymnMany: HymnTC.getResolver('findMany')
      .addFilterArg({
        name: 'text_contains',
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
        name: 'occasion',
        type: GraphQLMongoID,
        query: (query, value) => {
          query.occasions = value;
        }
      }),

    scriptureMany: ScriptureTC.getResolver('findMany').addFilterArg({
      name: 'text_contains',
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
      name: 'text_contains',
      type: GraphQLString,
      query: (query, value) => {
        query.title = {$regex: value, $options: '$i'};
      }
    }),
    pageContentOne: PageContentTC.getResolver('findOne'),

    prayerById: PrayerTC.getResolver('findById'),
    prayerPagination: PrayerTC.getResolver('pagination'),
    prayerMany: PrayerTC.getResolver('findMany').addFilterArg({
      name: 'text_contains',
      type: GraphQLString,
      query: (query, value, resolveParams) => {
        query.$text = {$search: value};
        resolveParams.args.sort = {
          score: {$meta: 'textScore'}
        };
        resolveParams.projection.score = {$meta: 'textScore'};
      }
    }),

    resourcesMany: ResourceTC.getResolver('findMany'),
    menuMany: MenuTC.getResolver('findMany'),
    metreMany: MetreTC.getResolver('findMany').addFilterArg({
      name: 'metre_contains',
      type: GraphQLString,
      query: (query, value) => {
        query.metre = {$regex: value, $options: '$i'};
      }
    })
  });

  schemaComposer.Mutation.addFields({
    createUser: UserTC.getResolver('createUser'),
    loginUser: UserTC.getResolver('loginUser'),
    changePassword: UserTC.getResolver('changePassword'),
    changeFreeAccount: UserTC.getResolver('changeFreeAccount'),

    addShortListItem: UserTC.getResolver('addShortListItem'),
    removeShortListItem: UserTC.getResolver('removeShortListItem')
  });

  const schema = schemaComposer.buildSchema();

  return schema;
};
