/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  main?: Maybe<Main>;
  subscription?: Maybe<StripeSubscription>;
  occasionManyGroupById?: Maybe<Array<Maybe<OccasionGroupedById>>>;
  menuItems?: Maybe<Array<Maybe<MenuItem>>>;
  textSearch?: Maybe<Array<Maybe<SearchResult>>>;
  search?: Maybe<Array<Maybe<SearchResult>>>;
  prayerSearch?: Maybe<Array<Maybe<Prayer>>>;
  liturgySearch?: Maybe<Array<Maybe<Liturgy>>>;
  pageContentOne?: Maybe<PageContent>;
  authorById?: Maybe<Author>;
  hymnById?: Maybe<Hymn>;
  keywordById?: Maybe<Keyword>;
  keywordMany?: Maybe<Array<Maybe<Keyword>>>;
  liturgyById?: Maybe<Liturgy>;
  scriptureById?: Maybe<Scripture>;
  tuneMany?: Maybe<Array<Maybe<Tune>>>;
  metreMany?: Maybe<Array<Maybe<Metre>>>;
  prayerById?: Maybe<Prayer>;
  prayerPagination?: Maybe<PrayerPagination>;
};


export type QueryTextSearchArgs = {
  filter: FilterInput;
};


export type QuerySearchArgs = {
  filter: SearchInput;
};


export type QueryPrayerSearchArgs = {
  filter: SearchInput;
};


export type QueryLiturgySearchArgs = {
  filter: SearchInput;
};


export type QueryPageContentOneArgs = {
  filter: FilterInput;
};


export type QueryAuthorByIdArgs = {
  id: Scalars['ID'];
};


export type QueryHymnByIdArgs = {
  id: Scalars['ID'];
};


export type QueryKeywordByIdArgs = {
  id: Scalars['ID'];
};


export type QueryKeywordManyArgs = {
  filter?: Maybe<FilterInput>;
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<KeywordSortBy>;
};


export type QueryLiturgyByIdArgs = {
  id: Scalars['ID'];
};


export type QueryScriptureByIdArgs = {
  id: Scalars['ID'];
};


export type QueryTuneManyArgs = {
  filter?: Maybe<FilterInput>;
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<TuneSortBy>;
};


export type QueryMetreManyArgs = {
  filter?: Maybe<FilterInput>;
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<MetreSortBy>;
};


export type QueryPrayerByIdArgs = {
  id: Scalars['ID'];
};


export type QueryPrayerPaginationArgs = {
  page: Scalars['Int'];
  perPage: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addShortListItem?: Maybe<Array<Maybe<ShortList>>>;
  removeShortListItem?: Maybe<Array<Maybe<ShortList>>>;
  changeFreeAccount?: Maybe<User>;
  updatePresentationOptions: PresentationOptions;
  createUser?: Maybe<User>;
  stripeCheckoutSession?: Maybe<StripeCheckoutSession>;
  changePassword?: Maybe<PasswordChangeTicket>;
  cancelSubscription?: Maybe<StripeSubscription>;
};


export type MutationAddShortListItemArgs = {
  item: Scalars['ID'];
};


export type MutationRemoveShortListItemArgs = {
  item: Scalars['ID'];
};


export type MutationChangeFreeAccountArgs = {
  hasFreeAccount: Scalars['Boolean'];
};


export type MutationUpdatePresentationOptionsArgs = {
  input: PresentationOptionsInput;
};


export type MutationCreateUserArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};



export type SearchResult = Hymn | Prayer | Liturgy | Scripture;

export type OccasionGroupedById = {
  __typename?: 'OccasionGroupedById';
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Occasion>>>;
};

export type SearchInput = {
  textContains?: Maybe<Scalars['String']>;
  book?: Maybe<EnumHymnBook>;
  occasion?: Maybe<Scalars['String']>;
  tune?: Maybe<Scalars['String']>;
  keyword?: Maybe<Scalars['String']>;
  _operators?: Maybe<SearchInputOperator>;
};

export type SearchInputOperator = {
  metre?: Maybe<MetreIn>;
};

export type MetreIn = {
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type PresentationOptionsInput = {
  background?: Maybe<Scalars['String']>;
  font?: Maybe<Scalars['String']>;
  ratio?: Maybe<Scalars['String']>;
};

export enum EnumHymnBook {
  None = 'none',
  Genesis = 'genesis',
  Exodus = 'exodus',
  Leviticus = 'leviticus',
  Numbers = 'numbers',
  Deuteronomy = 'deuteronomy',
  Joshua = 'joshua',
  Judges = 'judges',
  Ruth = 'ruth',
  FirstSamuel = 'first_samuel',
  SecondSamuel = 'second_samuel',
  FirstKings = 'first_kings',
  SecondKings = 'second_kings',
  FirstChronicles = 'first_chronicles',
  SecondChronicles = 'second_chronicles',
  Ezra = 'ezra',
  Nehemiah = 'nehemiah',
  Esther = 'esther',
  Job = 'job',
  Psalms = 'psalms',
  Proverbs = 'proverbs',
  Ecclesiastes = 'ecclesiastes',
  SongOfSongs = 'song_of_songs',
  Isaiah = 'isaiah',
  Jeremiah = 'jeremiah',
  Lamentations = 'lamentations',
  Ezekiel = 'ezekiel',
  Daniel = 'daniel',
  Hosea = 'hosea',
  Joel = 'joel',
  Amos = 'amos',
  Obadiah = 'obadiah',
  Jonah = 'jonah',
  Micah = 'micah',
  Nahum = 'nahum',
  Habakkuk = 'habakkuk',
  Zephaniah = 'zephaniah',
  Haggai = 'haggai',
  Zechariah = 'zechariah',
  Malachi = 'malachi',
  Matthew = 'matthew',
  Mark = 'mark',
  Luke = 'luke',
  John = 'john',
  Acts = 'acts',
  Romans = 'romans',
  FirstCorinthians = 'first_corinthians',
  SecondCorinthians = 'second_corinthians',
  Galatians = 'galatians',
  Ephesians = 'ephesians',
  Philippians = 'philippians',
  Colossians = 'colossians',
  FirstThessalonians = 'first_thessalonians',
  SecondThessalonians = 'second_thessalonians',
  FirstTimothy = 'first_timothy',
  SecondTimothy = 'second_timothy',
  Titus = 'titus',
  Philemon = 'philemon',
  Hebrews = 'hebrews',
  James = 'james',
  FirstPeter = 'first_peter',
  SecondPeter = 'second_peter',
  FirstJohn = 'first_john',
  SecondJohn = 'second_john',
  ThirdJohn = 'third_john',
  Jude = 'jude',
  Revelation = 'revelation'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage: Scalars['Int'];
  itemCount: Scalars['Int'];
  perPage: Scalars['Int'];
};

export type FilterInput = {
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
  textContains?: Maybe<Scalars['String']>;
};

export type Document = {
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
};

export type FeaturedReference = PageContent | ExternalUrl | RelativeUrl;

export type Main = Document & {
  __typename?: 'Main';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  heading?: Maybe<Scalars['String']>;
  subheading?: Maybe<Scalars['String']>;
  blurb?: Maybe<Scalars['JSON']>;
  searchblurb?: Maybe<Scalars['JSON']>;
  featured?: Maybe<Array<Maybe<FeaturedReference>>>;
  menuItems?: Maybe<Array<Maybe<MenuItem>>>;
};

export type ChildPageReference = PageContent | Hymn | Prayer | Liturgy | Scripture | Asset;

export type MenuItem = {
  __typename?: 'MenuItem';
  _key?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  childpages?: Maybe<Array<Maybe<ChildPage>>>;
};

export type ChildPage = {
  __typename?: 'ChildPage';
  _id: Scalars['ID'];
  childPage?: Maybe<ChildPageReference>;
  alternateText?: Maybe<Scalars['String']>;
};

export type Author = Document & {
  __typename?: 'Author';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  name?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['JSON']>;
  dates?: Maybe<Scalars['String']>;
  hymns?: Maybe<Array<Maybe<Hymn>>>;
  liturgies?: Maybe<Array<Maybe<Liturgy>>>;
  scripture?: Maybe<Array<Maybe<Scripture>>>;
};

export type Category = Document & {
  __typename?: 'Category';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  parent?: Maybe<Category>;
};

export type Copyright = Document & {
  __typename?: 'Copyright';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  name?: Maybe<Scalars['String']>;
};

export type Hymn = Document & {
  __typename?: 'Hymn';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  author?: Maybe<Author>;
  hymnNumber?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['JSON']>;
  tune?: Maybe<Tune>;
  alternateTunes?: Maybe<Array<Maybe<Tune>>>;
  book?: Maybe<Scalars['String']>;
  chapter?: Maybe<Scalars['Int']>;
  chapterVerse?: Maybe<Scalars['String']>;
  scripture?: Maybe<Scalars['String']>;
  files?: Maybe<Array<Maybe<Asset>>>;
  keywords?: Maybe<Array<Maybe<Keyword>>>;
  occasions?: Maybe<Array<Maybe<Occasion>>>;
  verses?: Maybe<Scalars['String']>;
  copyright?: Maybe<Copyright>;
};

export type Keyword = Document & {
  __typename?: 'Keyword';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  name?: Maybe<Scalars['String']>;
  hymns?: Maybe<Array<Maybe<Hymn>>>;
  prayers?: Maybe<Array<Maybe<Prayer>>>;
  liturgies?: Maybe<Array<Maybe<Liturgy>>>;
};

export enum KeywordSortBy {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

export type Liturgy = Document & {
  __typename?: 'Liturgy';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  author?: Maybe<Author>;
  content?: Maybe<Scalars['JSON']>;
  note?: Maybe<Scalars['String']>;
  files?: Maybe<Array<Maybe<Asset>>>;
  keywords?: Maybe<Array<Maybe<Keyword>>>;
  occasions?: Maybe<Array<Maybe<Occasion>>>;
  copyright?: Maybe<Copyright>;
};

export type Menu = Document & {
  __typename?: 'Menu';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  link?: Maybe<PageContent>;
};

export type Metre = Document & {
  __typename?: 'Metre';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  metre?: Maybe<Scalars['String']>;
  tunes?: Maybe<Array<Maybe<Tune>>>;
};

export enum MetreSortBy {
  MetreAsc = 'metre_ASC',
  MetreDesc = 'metre_DESC'
}

export type Occasion = Document & {
  __typename?: 'Occasion';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Occasion>;
  churchyear?: Maybe<Scalars['Boolean']>;
};

export type Prayer = Document & {
  __typename?: 'Prayer';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  author?: Maybe<Author>;
  content?: Maybe<Scalars['JSON']>;
  note?: Maybe<Scalars['String']>;
  occasions?: Maybe<Array<Maybe<Occasion>>>;
  copyright?: Maybe<Copyright>;
  keywords?: Maybe<Array<Maybe<Keyword>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
};

export type PrayerPagination = {
  __typename?: 'PrayerPagination';
  pageInfo?: Maybe<PageInfo>;
  items?: Maybe<Array<Maybe<Prayer>>>;
};

export type Scripture = Document & {
  __typename?: 'Scripture';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['JSON']>;
  note?: Maybe<Scalars['JSON']>;
  translation?: Maybe<Scalars['String']>;
  occasions?: Maybe<Array<Maybe<Occasion>>>;
  keywords?: Maybe<Array<Maybe<Keyword>>>;
};

export type Tune = Document & {
  __typename?: 'Tune';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  metre?: Maybe<Metre>;
  composer?: Maybe<Author>;
  file?: Maybe<Asset>;
  musicCopyright?: Maybe<Copyright>;
};

export enum TuneSortBy {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type Asset = Document & {
  __typename?: 'Asset';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  name?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

export type ResourceType = Asset | RelativeUrl | ExternalUrl | PageContent;

export type Resource = Document & {
  __typename?: 'Resource';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<ResourceType>;
};

export type PageContent = Document & {
  __typename?: 'PageContent';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  hasToc?: Maybe<Scalars['Boolean']>;
  content?: Maybe<Scalars['JSON']>;
};

export type ShortList = Hymn | Prayer | Liturgy | Scripture;

export type Name = {
  __typename?: 'Name';
  first?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
};

export type PresentationOptions = {
  __typename?: 'PresentationOptions';
  background?: Maybe<Scalars['String']>;
  font?: Maybe<Scalars['String']>;
  ratio?: Maybe<Scalars['String']>;
};

export enum InvoiceStatus {
  Draft = 'draft',
  Open = 'open',
  Paid = 'paid',
  Uncollectible = 'uncollectible',
  Void = 'void'
}

export type User = Document & {
  __typename?: 'User';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  auth0Id?: Maybe<Scalars['String']>;
  name?: Maybe<Name>;
  email?: Maybe<Scalars['String']>;
  hasPaidAccount?: Maybe<Scalars['Boolean']>;
  hasFreeAccount?: Maybe<Scalars['Boolean']>;
  picture?: Maybe<Scalars['String']>;
  shortlist?: Maybe<Array<Maybe<ShortList>>>;
  role?: Maybe<Scalars['String']>;
  periodEndDate?: Maybe<Scalars['Date']>;
  presentationOptions?: Maybe<PresentationOptions>;
  invoiceStatus?: Maybe<InvoiceStatus>;
  stripeCustomerId?: Maybe<Scalars['String']>;
};

export type RelativeUrl = Document & {
  __typename?: 'RelativeUrl';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ExternalUrl = Document & {
  __typename?: 'ExternalUrl';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type StripeCheckoutSession = {
  __typename?: 'StripeCheckoutSession';
  sessionId?: Maybe<Scalars['String']>;
};

export type StripeSubscription = {
  __typename?: 'StripeSubscription';
  id: Scalars['ID'];
  cancelAt?: Maybe<Scalars['Date']>;
  canceledAt?: Maybe<Scalars['Date']>;
  currentPeriodEnd?: Maybe<Scalars['Date']>;
  plan?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
  status?: Maybe<Scalars['String']>;
};

export type PasswordChangeTicket = {
  __typename?: 'PasswordChangeTicket';
  ticket?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<any>;
  Int: ResolverTypeWrapper<any>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<any>;
  String: ResolverTypeWrapper<any>;
  Date: ResolverTypeWrapper<any>;
  JSON: ResolverTypeWrapper<any>;
  SearchResult: ResolverTypeWrapper<any>;
  OccasionGroupedById: ResolverTypeWrapper<any>;
  SearchInput: ResolverTypeWrapper<any>;
  SearchInputOperator: ResolverTypeWrapper<any>;
  MetreIn: ResolverTypeWrapper<any>;
  PresentationOptionsInput: ResolverTypeWrapper<any>;
  EnumHymnBook: ResolverTypeWrapper<any>;
  PageInfo: ResolverTypeWrapper<any>;
  FilterInput: ResolverTypeWrapper<any>;
  Document: ResolversTypes['Main'] | ResolversTypes['Author'] | ResolversTypes['Category'] | ResolversTypes['Copyright'] | ResolversTypes['Hymn'] | ResolversTypes['Keyword'] | ResolversTypes['Liturgy'] | ResolversTypes['Menu'] | ResolversTypes['Metre'] | ResolversTypes['Occasion'] | ResolversTypes['Prayer'] | ResolversTypes['Scripture'] | ResolversTypes['Tune'] | ResolversTypes['Asset'] | ResolversTypes['Resource'] | ResolversTypes['PageContent'] | ResolversTypes['User'] | ResolversTypes['RelativeUrl'] | ResolversTypes['ExternalUrl'];
  FeaturedReference: ResolverTypeWrapper<any>;
  Main: ResolverTypeWrapper<any>;
  ChildPageReference: ResolverTypeWrapper<any>;
  MenuItem: ResolverTypeWrapper<any>;
  ChildPage: ResolverTypeWrapper<any>;
  Author: ResolverTypeWrapper<any>;
  Category: ResolverTypeWrapper<any>;
  Copyright: ResolverTypeWrapper<any>;
  Hymn: ResolverTypeWrapper<any>;
  Keyword: ResolverTypeWrapper<any>;
  KeywordSortBy: ResolverTypeWrapper<any>;
  Liturgy: ResolverTypeWrapper<any>;
  Menu: ResolverTypeWrapper<any>;
  Metre: ResolverTypeWrapper<any>;
  MetreSortBy: ResolverTypeWrapper<any>;
  Occasion: ResolverTypeWrapper<any>;
  Prayer: ResolverTypeWrapper<any>;
  PrayerPagination: ResolverTypeWrapper<any>;
  Scripture: ResolverTypeWrapper<any>;
  Tune: ResolverTypeWrapper<any>;
  TuneSortBy: ResolverTypeWrapper<any>;
  Asset: ResolverTypeWrapper<any>;
  ResourceType: ResolverTypeWrapper<any>;
  Resource: ResolverTypeWrapper<any>;
  PageContent: ResolverTypeWrapper<any>;
  ShortList: ResolverTypeWrapper<any>;
  Name: ResolverTypeWrapper<any>;
  PresentationOptions: ResolverTypeWrapper<any>;
  InvoiceStatus: ResolverTypeWrapper<any>;
  User: ResolverTypeWrapper<any>;
  RelativeUrl: ResolverTypeWrapper<any>;
  ExternalUrl: ResolverTypeWrapper<any>;
  StripeCheckoutSession: ResolverTypeWrapper<any>;
  StripeSubscription: ResolverTypeWrapper<any>;
  PasswordChangeTicket: ResolverTypeWrapper<any>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  ID: any;
  Int: any;
  Mutation: {};
  Boolean: any;
  String: any;
  Date: any;
  JSON: any;
  SearchResult: any;
  OccasionGroupedById: any;
  SearchInput: any;
  SearchInputOperator: any;
  MetreIn: any;
  PresentationOptionsInput: any;
  PageInfo: any;
  FilterInput: any;
  Document: ResolversParentTypes['Main'] | ResolversParentTypes['Author'] | ResolversParentTypes['Category'] | ResolversParentTypes['Copyright'] | ResolversParentTypes['Hymn'] | ResolversParentTypes['Keyword'] | ResolversParentTypes['Liturgy'] | ResolversParentTypes['Menu'] | ResolversParentTypes['Metre'] | ResolversParentTypes['Occasion'] | ResolversParentTypes['Prayer'] | ResolversParentTypes['Scripture'] | ResolversParentTypes['Tune'] | ResolversParentTypes['Asset'] | ResolversParentTypes['Resource'] | ResolversParentTypes['PageContent'] | ResolversParentTypes['User'] | ResolversParentTypes['RelativeUrl'] | ResolversParentTypes['ExternalUrl'];
  FeaturedReference: any;
  Main: any;
  ChildPageReference: any;
  MenuItem: any;
  ChildPage: any;
  Author: any;
  Category: any;
  Copyright: any;
  Hymn: any;
  Keyword: any;
  Liturgy: any;
  Menu: any;
  Metre: any;
  Occasion: any;
  Prayer: any;
  PrayerPagination: any;
  Scripture: any;
  Tune: any;
  Asset: any;
  ResourceType: any;
  Resource: any;
  PageContent: any;
  ShortList: any;
  Name: any;
  PresentationOptions: any;
  User: any;
  RelativeUrl: any;
  ExternalUrl: any;
  StripeCheckoutSession: any;
  StripeSubscription: any;
  PasswordChangeTicket: any;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  main?: Resolver<Maybe<ResolversTypes['Main']>, ParentType, ContextType>;
  subscription?: Resolver<Maybe<ResolversTypes['StripeSubscription']>, ParentType, ContextType>;
  occasionManyGroupById?: Resolver<Maybe<Array<Maybe<ResolversTypes['OccasionGroupedById']>>>, ParentType, ContextType>;
  menuItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenuItem']>>>, ParentType, ContextType>;
  textSearch?: Resolver<Maybe<Array<Maybe<ResolversTypes['SearchResult']>>>, ParentType, ContextType, RequireFields<QueryTextSearchArgs, 'filter'>>;
  search?: Resolver<Maybe<Array<Maybe<ResolversTypes['SearchResult']>>>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'filter'>>;
  prayerSearch?: Resolver<Maybe<Array<Maybe<ResolversTypes['Prayer']>>>, ParentType, ContextType, RequireFields<QueryPrayerSearchArgs, 'filter'>>;
  liturgySearch?: Resolver<Maybe<Array<Maybe<ResolversTypes['Liturgy']>>>, ParentType, ContextType, RequireFields<QueryLiturgySearchArgs, 'filter'>>;
  pageContentOne?: Resolver<Maybe<ResolversTypes['PageContent']>, ParentType, ContextType, RequireFields<QueryPageContentOneArgs, 'filter'>>;
  authorById?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, RequireFields<QueryAuthorByIdArgs, 'id'>>;
  hymnById?: Resolver<Maybe<ResolversTypes['Hymn']>, ParentType, ContextType, RequireFields<QueryHymnByIdArgs, 'id'>>;
  keywordById?: Resolver<Maybe<ResolversTypes['Keyword']>, ParentType, ContextType, RequireFields<QueryKeywordByIdArgs, 'id'>>;
  keywordMany?: Resolver<Maybe<Array<Maybe<ResolversTypes['Keyword']>>>, ParentType, ContextType, RequireFields<QueryKeywordManyArgs, never>>;
  liturgyById?: Resolver<Maybe<ResolversTypes['Liturgy']>, ParentType, ContextType, RequireFields<QueryLiturgyByIdArgs, 'id'>>;
  scriptureById?: Resolver<Maybe<ResolversTypes['Scripture']>, ParentType, ContextType, RequireFields<QueryScriptureByIdArgs, 'id'>>;
  tuneMany?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tune']>>>, ParentType, ContextType, RequireFields<QueryTuneManyArgs, never>>;
  metreMany?: Resolver<Maybe<Array<Maybe<ResolversTypes['Metre']>>>, ParentType, ContextType, RequireFields<QueryMetreManyArgs, never>>;
  prayerById?: Resolver<Maybe<ResolversTypes['Prayer']>, ParentType, ContextType, RequireFields<QueryPrayerByIdArgs, 'id'>>;
  prayerPagination?: Resolver<Maybe<ResolversTypes['PrayerPagination']>, ParentType, ContextType, RequireFields<QueryPrayerPaginationArgs, 'page' | 'perPage'>>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addShortListItem?: Resolver<Maybe<Array<Maybe<ResolversTypes['ShortList']>>>, ParentType, ContextType, RequireFields<MutationAddShortListItemArgs, 'item'>>;
  removeShortListItem?: Resolver<Maybe<Array<Maybe<ResolversTypes['ShortList']>>>, ParentType, ContextType, RequireFields<MutationRemoveShortListItemArgs, 'item'>>;
  changeFreeAccount?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationChangeFreeAccountArgs, 'hasFreeAccount'>>;
  updatePresentationOptions?: Resolver<ResolversTypes['PresentationOptions'], ParentType, ContextType, RequireFields<MutationUpdatePresentationOptionsArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword'>>;
  stripeCheckoutSession?: Resolver<Maybe<ResolversTypes['StripeCheckoutSession']>, ParentType, ContextType>;
  changePassword?: Resolver<Maybe<ResolversTypes['PasswordChangeTicket']>, ParentType, ContextType>;
  cancelSubscription?: Resolver<Maybe<ResolversTypes['StripeSubscription']>, ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type SearchResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']> = {
  __resolveType: TypeResolveFn<'Hymn' | 'Prayer' | 'Liturgy' | 'Scripture', ParentType, ContextType>;
};

export type OccasionGroupedByIdResolvers<ContextType = Context, ParentType extends ResolversParentTypes['OccasionGroupedById'] = ResolversParentTypes['OccasionGroupedById']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  values?: Resolver<Maybe<Array<Maybe<ResolversTypes['Occasion']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  itemCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  perPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type DocumentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = {
  __resolveType: TypeResolveFn<'Main' | 'Author' | 'Category' | 'Copyright' | 'Hymn' | 'Keyword' | 'Liturgy' | 'Menu' | 'Metre' | 'Occasion' | 'Prayer' | 'Scripture' | 'Tune' | 'Asset' | 'Resource' | 'PageContent' | 'User' | 'RelativeUrl' | 'ExternalUrl', ParentType, ContextType>;
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
};

export type FeaturedReferenceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FeaturedReference'] = ResolversParentTypes['FeaturedReference']> = {
  __resolveType: TypeResolveFn<'PageContent' | 'ExternalUrl' | 'RelativeUrl', ParentType, ContextType>;
};

export type MainResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Main'] = ResolversParentTypes['Main']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  heading?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subheading?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  blurb?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  searchblurb?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  featured?: Resolver<Maybe<Array<Maybe<ResolversTypes['FeaturedReference']>>>, ParentType, ContextType>;
  menuItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenuItem']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ChildPageReferenceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ChildPageReference'] = ResolversParentTypes['ChildPageReference']> = {
  __resolveType: TypeResolveFn<'PageContent' | 'Hymn' | 'Prayer' | 'Liturgy' | 'Scripture' | 'Asset', ParentType, ContextType>;
};

export type MenuItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MenuItem'] = ResolversParentTypes['MenuItem']> = {
  _key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  childpages?: Resolver<Maybe<Array<Maybe<ResolversTypes['ChildPage']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ChildPageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ChildPage'] = ResolversParentTypes['ChildPage']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  childPage?: Resolver<Maybe<ResolversTypes['ChildPageReference']>, ParentType, ContextType>;
  alternateText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AuthorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  dates?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hymns?: Resolver<Maybe<Array<Maybe<ResolversTypes['Hymn']>>>, ParentType, ContextType>;
  liturgies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Liturgy']>>>, ParentType, ContextType>;
  scripture?: Resolver<Maybe<Array<Maybe<ResolversTypes['Scripture']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CategoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CopyrightResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Copyright'] = ResolversParentTypes['Copyright']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type HymnResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Hymn'] = ResolversParentTypes['Hymn']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
  hymnNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  tune?: Resolver<Maybe<ResolversTypes['Tune']>, ParentType, ContextType>;
  alternateTunes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tune']>>>, ParentType, ContextType>;
  book?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  chapter?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  chapterVerse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scripture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  files?: Resolver<Maybe<Array<Maybe<ResolversTypes['Asset']>>>, ParentType, ContextType>;
  keywords?: Resolver<Maybe<Array<Maybe<ResolversTypes['Keyword']>>>, ParentType, ContextType>;
  occasions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Occasion']>>>, ParentType, ContextType>;
  verses?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  copyright?: Resolver<Maybe<ResolversTypes['Copyright']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type KeywordResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Keyword'] = ResolversParentTypes['Keyword']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hymns?: Resolver<Maybe<Array<Maybe<ResolversTypes['Hymn']>>>, ParentType, ContextType>;
  prayers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Prayer']>>>, ParentType, ContextType>;
  liturgies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Liturgy']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type LiturgyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Liturgy'] = ResolversParentTypes['Liturgy']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  files?: Resolver<Maybe<Array<Maybe<ResolversTypes['Asset']>>>, ParentType, ContextType>;
  keywords?: Resolver<Maybe<Array<Maybe<ResolversTypes['Keyword']>>>, ParentType, ContextType>;
  occasions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Occasion']>>>, ParentType, ContextType>;
  copyright?: Resolver<Maybe<ResolversTypes['Copyright']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MenuResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Menu'] = ResolversParentTypes['Menu']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['PageContent']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MetreResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Metre'] = ResolversParentTypes['Metre']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  metre?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tunes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tune']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type OccasionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Occasion'] = ResolversParentTypes['Occasion']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Occasion']>, ParentType, ContextType>;
  churchyear?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PrayerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Prayer'] = ResolversParentTypes['Prayer']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  occasions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Occasion']>>>, ParentType, ContextType>;
  copyright?: Resolver<Maybe<ResolversTypes['Copyright']>, ParentType, ContextType>;
  keywords?: Resolver<Maybe<Array<Maybe<ResolversTypes['Keyword']>>>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PrayerPaginationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PrayerPagination'] = ResolversParentTypes['PrayerPagination']> = {
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Prayer']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ScriptureResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Scripture'] = ResolversParentTypes['Scripture']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  translation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  occasions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Occasion']>>>, ParentType, ContextType>;
  keywords?: Resolver<Maybe<Array<Maybe<ResolversTypes['Keyword']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type TuneResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Tune'] = ResolversParentTypes['Tune']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metre?: Resolver<Maybe<ResolversTypes['Metre']>, ParentType, ContextType>;
  composer?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
  file?: Resolver<Maybe<ResolversTypes['Asset']>, ParentType, ContextType>;
  musicCopyright?: Resolver<Maybe<ResolversTypes['Copyright']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AssetResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Asset'] = ResolversParentTypes['Asset']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  file?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ResourceTypeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ResourceType'] = ResolversParentTypes['ResourceType']> = {
  __resolveType: TypeResolveFn<'Asset' | 'RelativeUrl' | 'ExternalUrl' | 'PageContent', ParentType, ContextType>;
};

export type ResourceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Resource'] = ResolversParentTypes['Resource']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ResourceType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PageContentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageContent'] = ResolversParentTypes['PageContent']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subtitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasToc?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ShortListResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ShortList'] = ResolversParentTypes['ShortList']> = {
  __resolveType: TypeResolveFn<'Hymn' | 'Prayer' | 'Liturgy' | 'Scripture', ParentType, ContextType>;
};

export type NameResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Name'] = ResolversParentTypes['Name']> = {
  first?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PresentationOptionsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PresentationOptions'] = ResolversParentTypes['PresentationOptions']> = {
  background?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  font?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ratio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  auth0Id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['Name']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasPaidAccount?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasFreeAccount?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shortlist?: Resolver<Maybe<Array<Maybe<ResolversTypes['ShortList']>>>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  periodEndDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  presentationOptions?: Resolver<Maybe<ResolversTypes['PresentationOptions']>, ParentType, ContextType>;
  invoiceStatus?: Resolver<Maybe<ResolversTypes['InvoiceStatus']>, ParentType, ContextType>;
  stripeCustomerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type RelativeUrlResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RelativeUrl'] = ResolversParentTypes['RelativeUrl']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ExternalUrlResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ExternalUrl'] = ResolversParentTypes['ExternalUrl']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type StripeCheckoutSessionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StripeCheckoutSession'] = ResolversParentTypes['StripeCheckoutSession']> = {
  sessionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type StripeSubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StripeSubscription'] = ResolversParentTypes['StripeSubscription']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  cancelAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  canceledAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  currentPeriodEnd?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  plan?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PasswordChangeTicketResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PasswordChangeTicket'] = ResolversParentTypes['PasswordChangeTicket']> = {
  ticket?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = Context> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Date?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  SearchResult?: SearchResultResolvers<ContextType>;
  OccasionGroupedById?: OccasionGroupedByIdResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Document?: DocumentResolvers<ContextType>;
  FeaturedReference?: FeaturedReferenceResolvers<ContextType>;
  Main?: MainResolvers<ContextType>;
  ChildPageReference?: ChildPageReferenceResolvers<ContextType>;
  MenuItem?: MenuItemResolvers<ContextType>;
  ChildPage?: ChildPageResolvers<ContextType>;
  Author?: AuthorResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Copyright?: CopyrightResolvers<ContextType>;
  Hymn?: HymnResolvers<ContextType>;
  Keyword?: KeywordResolvers<ContextType>;
  Liturgy?: LiturgyResolvers<ContextType>;
  Menu?: MenuResolvers<ContextType>;
  Metre?: MetreResolvers<ContextType>;
  Occasion?: OccasionResolvers<ContextType>;
  Prayer?: PrayerResolvers<ContextType>;
  PrayerPagination?: PrayerPaginationResolvers<ContextType>;
  Scripture?: ScriptureResolvers<ContextType>;
  Tune?: TuneResolvers<ContextType>;
  Asset?: AssetResolvers<ContextType>;
  ResourceType?: ResourceTypeResolvers<ContextType>;
  Resource?: ResourceResolvers<ContextType>;
  PageContent?: PageContentResolvers<ContextType>;
  ShortList?: ShortListResolvers<ContextType>;
  Name?: NameResolvers<ContextType>;
  PresentationOptions?: PresentationOptionsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  RelativeUrl?: RelativeUrlResolvers<ContextType>;
  ExternalUrl?: ExternalUrlResolvers<ContextType>;
  StripeCheckoutSession?: StripeCheckoutSessionResolvers<ContextType>;
  StripeSubscription?: StripeSubscriptionResolvers<ContextType>;
  PasswordChangeTicket?: PasswordChangeTicketResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
