import microCors from 'micro-cors';
import {NextApiRequest} from 'next';
import {ApolloServer} from 'apollo-server-micro';
import auth0 from '../_auth0';
import * as prayerModel from './_models/prayer';
import * as resourceModel from './_models/resource';
import * as userModel from './_models/user';
import * as pageContentModel from './_models/page-content';
import * as liturgyModel from './_models/liturgy';
import * as authorModel from './_models/author';
import * as hymnModel from './_models/hymn';
import * as metreModel from './_models/metre';
import * as tuneModel from './_models/tune';
import * as occasionModel from './_models/occasion';
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
