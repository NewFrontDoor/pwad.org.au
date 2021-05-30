import {IncomingMessage, ServerResponse} from 'http';
import {errAsync, ResultAsync} from 'neverthrow';
import {getSession} from '@auth0/nextjs-auth0';
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

type UserResult = ResultAsync<User, string>;

export type Context = {
  host: URL;
  user: UserResult;
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

export function context(ctx?: {
  req?: IncomingMessage;
  res?: ServerResponse;
}): Context {
  const user =
    ctx?.req && ctx.res
      ? getUserContext(ctx.req, ctx.res)
      : errAsync<User, string>('No User Session');

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

export function getUserContext(
  request: IncomingMessage,
  response: ServerResponse
): UserResult {
  const session = getSession(request, response);

  if (session) {
    return ResultAsync.fromPromise(
      userModel.findOrCreate(session.user),
      () => 'No User Session'
    ).map((result) => {
      const {
        _id,
        name,
        email,
        role,
        shortlist = [],
        periodEndDate,
        hasPaidAccount,
        stripeCustomerId,
        presentationOptions
      } = result;

      const user: User = {
        _id,
        role,
        name,
        email,
        shortlist,
        periodEndDate,
        hasPaidAccount,
        stripeCustomerId,
        presentationOptions,
        auth0Id: session.user.sub,
        picture: session.user.picture
      };

      return user;
    });
  }

  return errAsync('No User Session');
}
