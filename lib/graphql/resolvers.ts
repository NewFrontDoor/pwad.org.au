import upperFirst from 'lodash/upperFirst';
import books from '../books';
import {defineAbilitiesFor} from '../abilities';
import {Resolvers, Hymn, Maybe, Document} from './gen-types';

type SanityType =
  | 'User'
  | 'Hymn'
  | 'Author'
  | 'Tune'
  | 'Metre'
  | 'Asset'
  | 'Copyright'
  | 'Occasion'
  | 'Prayer'
  | 'Keyword'
  | 'Category'
  | 'Liturgy'
  | 'Scripture'
  | 'PageContent'
  | 'ExternalUrl'
  | 'RelativeUrl'
  | 'Main'
  | 'Menu'
  | 'Resource';

const resolveSanityDocument = <T extends SanityType>(
  parent: Document
): Maybe<T> => {
  if (parent?._type) {
    return upperFirst(parent._type) as T;
  }

  return null;
};

export const resolvers: Resolvers = {
  Query: {
    async me(_parent, _args, context) {
      try {
        const user = await context.user;

        return user;
      } catch {
        return null;
      }
    },
    async main(_parent, _args, context) {
      return context.models.resource.main();
    },
    async menuItems(_parent, _args, context) {
      return context.models.resource.menuItems();
    },
    async prayerById(_parent, args, context) {
      return context.models.prayer.getById(args.id);
    },
    async liturgyById(_parent, args, context) {
      return context.models.liturgy.getById(args.id);
    },
    async hymnById(_parent, args, context) {
      return context.models.hymn.getById(args.id);
    },
    async scriptureById(_parent, args, context) {
      return context.models.scripture.getById(args.id);
    },
    async keywordById(_parent, args, context) {
      return context.models.keyword.getById(args.id);
    },
    async textSearch(_parent, args, context) {
      const user = await context.user;
      const ability = defineAbilitiesFor(user);
      const {search} = args.filter;
      return context.models.resource.textSearch(ability, search);
    },
    async authorById(_parent, args, context) {
      return context.models.author.getById(args.id);
    },
    async occasionManyGroupById(_parent, _args, context) {
      return context.models.occasion.findAll();
    },
    async pageContentOne(_parent, args, context) {
      const {slug} = args.filter;
      return context.models.pageContent.getBySlug(slug);
    },
    async metreMany(_parent, args, context) {
      return context.models.metre.findMany(
        args.filter,
        args.sort,
        args.skip,
        args.limit
      );
    },
    async tuneMany(_parent, args, context) {
      return context.models.tune.findMany(
        args.filter,
        args.sort,
        args.skip,
        args.limit
      );
    },
    async keywordMany(_parent, args, context) {
      return context.models.keyword.findMany(
        args.filter,
        args.sort,
        args.skip,
        args.limit
      );
    },
    async search(_parent, args, context) {
      return context.models.hymn.search(args.filter);
    },
    async prayerSearch(_parent, args, context) {
      return context.models.prayer.search(args.filter);
    },
    async liturgySearch(_parent, args, context) {
      return context.models.liturgy.search(args.filter);
    },
    async subscription(_parent, _args, context) {
      const user = await context.user;
      return context.models.stripe.getUserSubscription(user);
    }
  },
  Mutation: {
    async changePassword(_parent, _args, context) {
      const user = await context.user;
      return context.models.user.changePassword(user, context.host);
    },
    async stripeCheckoutSession(_parent, _args, context) {
      const user = await context.user;
      return context.models.stripe.createCheckoutSession(user, context.host);
    },
    async cancelSubscription(_parent, _args, context) {
      const user = await context.user;
      return context.models.stripe.cancelSubscription(user);
    },
    async addShortListItem(_parent, args, context) {
      const user = await context.user;
      return context.models.user.addShortListItem(user, args.item);
    },
    async removeShortListItem(_parent, args, context) {
      const user = await context.user;
      const itemIndex = user.shortlist.findIndex(({_id}) => args.item === _id);
      return context.models.user.removeShortListItem(user, itemIndex);
    }
  },
  Document: {
    __resolveType: resolveSanityDocument
  },
  Hymn: {
    scripture(parent, _context, _info) {
      const {book, chapter, verses} = parent as Hymn;
      let scripture = '';
      const found = books.find(({value}) => book === value);

      if (found) {
        scripture += found.label;

        if (chapter) {
          scripture += ` ${chapter}`;

          if (verses) {
            scripture += `:${verses}`;
          }
        }
      }

      return scripture;
    }
  },
  ShortList: {
    __resolveType: resolveSanityDocument
  },
  SearchResult: {
    __resolveType: resolveSanityDocument
  },
  FeaturedReference: {
    __resolveType: resolveSanityDocument
  },
  ChildPageReference: {
    __resolveType: resolveSanityDocument
  },
  ResourceType: {
    __resolveType: resolveSanityDocument
  }
};
