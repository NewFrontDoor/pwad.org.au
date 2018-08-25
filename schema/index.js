const keystone = require('keystone');
const {GQC} = require('graphql-compose');
const {composeWithMongoose} = require('graphql-compose-mongoose');

const AuthorTC = composeWithMongoose(keystone.list('Author').model);
const CategoryTC = composeWithMongoose(keystone.list('Category').model);
const HymnTC = composeWithMongoose(keystone.list('Hymn').model);
const TuneTC = composeWithMongoose(keystone.list('Tune').model);
const UserTC = composeWithMongoose(keystone.list('User').model);

UserTC.removeField(['email', 'password']);

GQC.rootQuery().addFields({
  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  userTotal: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),

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
  hymnMany: HymnTC.getResolver('findMany'),
  hymnTotal: HymnTC.getResolver('count'),
  hymnConnection: HymnTC.getResolver('connection'),

  tuneById: TuneTC.getResolver('findById'),
  tuneByIDs: TuneTC.getResolver('findByIds'),
  tuneOne: TuneTC.getResolver('findOne'),
  tuneMany: TuneTC.getResolver('findMany'),
  tunetotal: TuneTC.getResolver('count'),
  tuneConnection: TuneTC.getResolver('connection')
});

const schema = GQC.buildSchema();

module.exports = schema;
