import {NextApiRequest} from 'next';
import {ApolloServer} from 'apollo-server-micro';
import auth0 from '../auth0';
import * as prayerModel from './models/prayer';
import * as resourceModel from './models/resource';
import * as userModel from './models/user';
import * as pageContentModel from './models/page-content';
import * as liturgyModel from './models/liturgy';
import * as authorModel from './models/author';
import * as hymnModel from './models/hymn';
import * as metreModel from './models/metre';
import * as tuneModel from './models/tune';
import * as occasionModel from './models/occasion';
import * as keywordModel from './models/keyword';
import * as scriptureModel from './models/scripture';
import {schema} from './schema';
import {resolvers} from './resolvers';
import {User} from './gen-types';

export type Context = {
  user: Promise<User>;
  models: {
    pageContent: typeof pageContentModel;
    resource: typeof resourceModel;
    prayer: typeof prayerModel;
    user: typeof userModel;
    hymn: typeof hymnModel;
    liturgy: typeof liturgyModel;
    author: typeof authorModel;
    metre: typeof metreModel;
    tune: typeof tuneModel;
    occasion: typeof occasionModel;
    keyword: typeof keywordModel;
    scripture: typeof scriptureModel;
  };
};

function context({req}: {req: NextApiRequest}): Context {
  return {
    models: {
      author: authorModel,
      pageContent: pageContentModel,
      resource: resourceModel,
      prayer: prayerModel,
      hymn: hymnModel,
      user: userModel,
      liturgy: liturgyModel,
      metre: metreModel,
      tune: tuneModel,
      occasion: occasionModel,
      keyword: keywordModel,
      scripture: scriptureModel
    },
    user: getUserContext(req)
  };
}

async function getUserContext(req: NextApiRequest): Promise<User | null> {
  const response = await auth0.getSession(req);

  if (response) {
    const {user} = response;
    let hasPaidAccount = false;

    if (typeof user['https://pwad.now.sh/paymentIntent'] === 'string') {
      hasPaidAccount = user['https://pwad.now.sh/paymentIntent'].length > 0;
    }

    const {
      _id,
      name,
      email,
      role,
      shortlist = []
    } = await userModel.findOrCreate(user);

    return {
      _id,
      role,
      name,
      email,
      shortlist,
      hasPaidAccount,
      picture: user.picture
    };
  }

  return null;
}

export default new ApolloServer({
  typeDefs: schema,
  resolvers,
  context
});
