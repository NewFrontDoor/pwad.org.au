import {NextApiRequest} from 'next';
import auth0 from '../auth0';
import {HOST_URL} from '../host-url';
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

import {User} from './gen-types';

export type Context = {
  host: URL;
  user: Promise<User>;
  models: {
    prayer: typeof prayerModel;
    resource: typeof resourceModel;
    user: typeof userModel;
    pageContent: typeof pageContentModel;
    liturgy: typeof liturgyModel;
    author: typeof authorModel;
    hymn: typeof hymnModel;
    metre: typeof metreModel;
    tune: typeof tuneModel;
    occasion: typeof occasionModel;
    keyword: typeof keywordModel;
    scripture: typeof scriptureModel;
    stripe: typeof stripeModel;
  };
};

export function context(ctx?: {req?: NextApiRequest}): Context {
  const user = ctx?.req ? getUserContext(ctx.req) : null;
  const host = new URL(HOST_URL);

  return {
    models: {
      prayer: prayerModel,
      resource: resourceModel,
      user: userModel,
      pageContent: pageContentModel,
      liturgy: liturgyModel,
      author: authorModel,
      hymn: hymnModel,
      metre: metreModel,
      tune: tuneModel,
      occasion: occasionModel,
      keyword: keywordModel,
      scripture: scriptureModel,
      stripe: stripeModel
    },
    host,
    user
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
