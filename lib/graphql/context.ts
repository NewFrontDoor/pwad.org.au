import {IncomingMessage} from 'http';
import {err, errAsync, ResultAsync} from 'neverthrow';
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

export function context(ctx?: {req?: IncomingMessage}): Context {
  const user = ctx?.req
    ? getUserContext(ctx.req)
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

export function getUserContext(request: IncomingMessage): UserResult {
  return ResultAsync.fromPromise(
    auth0.getSession(request),
    () => 'No User Session'
  ).andThen((response) => {
    if (response) {
      return ResultAsync.fromPromise(
        userModel.findOrCreate(response.user),
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
          auth0Id: response.user.sub,
          picture: response.user.picture
        };

        return user;
      });
    }

    return err('No User Session');
  });
}
