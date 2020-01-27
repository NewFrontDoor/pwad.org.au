import upperFirst from 'lodash/upperFirst';
import {Resolvers, ShortList, Maybe} from './_gen-types';

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

function resolveSanityType(parent: {_type: string}): Maybe<SanityType> {
  switch (parent._type) {
    case 'user':
    case 'hymn':
    case 'author':
    case 'tune':
    case 'metre':
    case 'asset':
    case 'copyright':
    case 'occasion':
    case 'prayer':
    case 'keyword':
    case 'category':
    case 'liturgy':
    case 'scripture':
    case 'pageContent':
    case 'externalUrl':
    case 'relativeUrl':
    case 'main':
    case 'menu':
    case 'resource':
      return upperFirst(parent._type) as SanityType;
    default:
      return null;
  }
}

export const resolvers: Resolvers = {
  Query: {
    async me(_parent, _args, context) {
      try {
        const user = await context.user;

        return user;
      } catch (_) {
        console.log(_);
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
    async textSearch(_parent, args, context) {
      const user = await context.user;
      const {search} = args.filter;
      return context.models.resource.textSearch(user, search);
    },
    async authorById(_parent, args, context) {
      return context.models.author.getById(args.id);
    },
    async pageContentOne(_parent, args, context) {
      const {id} = args.filter;
      return context.models.pageContent.getById(id);
    }
  },
  Mutation: {
    async addShortListItem(_parent, args, context): Promise<ShortList[]> {
      const user = await context.user;
      return context.models.user.addShortListItem(user._id, args.hymn);
    },
    async removeShortListItem(_parent, args, context): Promise<ShortList[]> {
      const user = await context.user;
      const hymnIndex = user.shortlist.findIndex(({_id}) => args.hymn === _id);
      return context.models.user.removeShortListItem(user._id, hymnIndex);
    }
  },
  Document: {
    __resolveType(parent, _context, _info) {
      return resolveSanityType(parent);
    }
  },
  ShortList: {
    __resolveType(parent, _context, _info) {
      return resolveSanityType(parent);
    }
  },
  SearchResult: {
    __resolveType(parent, _context, _info) {
      return resolveSanityType(parent);
    }
  },
  FeaturedReference: {
    __resolveType(parent, _context, _info) {
      return resolveSanityType(parent);
    }
  },
  ChildPageReference: {
    __resolveType(parent, _context, _info) {
      return resolveSanityType(parent);
    }
  },
  ResourceType: {
    __resolveType(parent, _context, _info) {
      return resolveSanityType(parent);
    }
  }
};
