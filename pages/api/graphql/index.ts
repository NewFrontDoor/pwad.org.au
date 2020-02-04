import microCors from 'micro-cors';
import {NextApiRequest} from 'next';
import {ApolloServer} from 'apollo-server-micro';
import auth0 from '../_auth0';
import * as prayerModel from './models/_prayer';
import * as resourceModel from './models/_resource';
import * as userModel from './models/_user';
import * as pageContentModel from './models/_page-content';
import * as liturgyModel from './models/_liturgy';
import * as authorModel from './models/_author';
import * as hymnModel from './models/_hymn';
import * as metreModel from './models/_metre';
import * as tuneModel from './models/_tune';
import * as occasionModel from './models/_occasion';
import {schema} from './_schema';
import {resolvers} from './_resolvers';
import {User} from './_gen-types';

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
      occasion: occasionModel
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

const cors = microCors();

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default cors(apolloServer.createHandler({path: '/api/graphql'}));
