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
import * as stripeModel from './models/stripe';
import {schema} from './schema';
import {resolvers} from './resolvers';
import {User} from './gen-types';
import buildUrl from '../build-url';

export type Context = {
  user: Promise<User>;
  host: URL;
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
    stripe: typeof stripeModel;
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
      scripture: scriptureModel,
      stripe: stripeModel
    },
    host: buildUrl(req),
    user: getUserContext(req)
  };
}

async function getUserContext(request: NextApiRequest): Promise<User | null> {
  const response = await auth0.getSession(request);

  if (response) {
    const {user} = response;

    const {
      _id,
      name,
      email,
      role,
      shortlist = [],
      periodEndDate,
      hasPaidAccount,
      stripeCustomerId
    } = await userModel.findOrCreate(user);

    return {
      _id,
      role,
      name,
      email,
      shortlist,
      periodEndDate,
      hasPaidAccount,
      stripeCustomerId,
      auth0Id: user.sub,
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
