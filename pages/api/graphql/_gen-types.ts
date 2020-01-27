/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: any,
  JSON: any,
};

export type Asset = Document & {
   __typename?: 'Asset',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  name?: Maybe<Scalars['String']>,
  file?: Maybe<Scalars['String']>,
};

export type Author = Document & {
   __typename?: 'Author',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  name?: Maybe<Scalars['String']>,
  bio?: Maybe<Scalars['JSON']>,
  dates?: Maybe<Scalars['String']>,
  hymns?: Maybe<Array<Maybe<Hymn>>>,
  liturgies?: Maybe<Array<Maybe<Liturgy>>>,
  scripture?: Maybe<Array<Maybe<Scripture>>>,
};

export type Category = Document & {
   __typename?: 'Category',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  title?: Maybe<Scalars['String']>,
  parent?: Maybe<Category>,
};

export type ChildPageReference = PageContent | Hymn | Prayer | Liturgy | Scripture | Asset;

export type Copyright = Document & {
   __typename?: 'Copyright',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  name?: Maybe<Scalars['String']>,
};


export type Document = {
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
};

export type ExternalUrl = Document & {
   __typename?: 'ExternalUrl',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  title?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
};

export type FeaturedReference = PageContent | ExternalUrl | RelativeUrl;

export type FilterInput = {
  id?: Maybe<Scalars['String']>,
  search?: Maybe<Scalars['String']>,
  text_contains?: Maybe<Scalars['String']>,
};

export type Hymn = Document & {
   __typename?: 'Hymn',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  title?: Maybe<Scalars['String']>,
  author?: Maybe<Author>,
  hymnNumber?: Maybe<Scalars['Int']>,
  content?: Maybe<Scalars['JSON']>,
  tune?: Maybe<Tune>,
  book?: Maybe<Scalars['String']>,
  chapter?: Maybe<Scalars['Int']>,
  chapterVerse?: Maybe<Scalars['String']>,
  files?: Maybe<Array<Maybe<Asset>>>,
  keywords?: Maybe<Array<Maybe<Keyword>>>,
  occasions?: Maybe<Array<Maybe<Occasion>>>,
  verses?: Maybe<Scalars['String']>,
  copyright?: Maybe<Copyright>,
};


export type Keyword = Document & {
   __typename?: 'Keyword',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  name?: Maybe<Scalars['String']>,
  hymns?: Maybe<Array<Maybe<Hymn>>>,
  prayers?: Maybe<Array<Maybe<Prayer>>>,
  liturgies?: Maybe<Array<Maybe<Liturgy>>>,
};

export type Liturgy = Document & {
   __typename?: 'Liturgy',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  title?: Maybe<Scalars['String']>,
  author?: Maybe<Author>,
  content?: Maybe<Scalars['JSON']>,
  note?: Maybe<Scalars['String']>,
  files?: Maybe<Array<Maybe<Asset>>>,
  keywords?: Maybe<Array<Maybe<Keyword>>>,
  occasions?: Maybe<Array<Maybe<Occasion>>>,
  copyright?: Maybe<Copyright>,
};

export type Main = Document & {
   __typename?: 'Main',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  heading?: Maybe<Scalars['String']>,
  subheading?: Maybe<Scalars['String']>,
  blurb?: Maybe<Scalars['JSON']>,
  searchblurb?: Maybe<Scalars['JSON']>,
  featured?: Maybe<Array<Maybe<FeaturedReference>>>,
  menuItems?: Maybe<Array<Maybe<MenuItem>>>,
};

export type Menu = Document & {
   __typename?: 'Menu',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  code?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  link?: Maybe<PageContent>,
};

export type MenuItem = {
   __typename?: 'MenuItem',
  _key?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>,
  childpages?: Maybe<Array<Maybe<ChildPageReference>>>,
};

export type Metre = Document & {
   __typename?: 'Metre',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  metre?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  addShortListItem?: Maybe<Array<Maybe<ShortList>>>,
  removeShortListItem?: Maybe<Array<Maybe<ShortList>>>,
  changeFreeAccount?: Maybe<User>,
  createUser?: Maybe<User>,
  loginUser?: Maybe<User>,
  changePassword?: Maybe<User>,
};


export type MutationAddShortListItemArgs = {
  hymn: Scalars['ID']
};


export type MutationRemoveShortListItemArgs = {
  hymn: Scalars['ID']
};


export type MutationChangeFreeAccountArgs = {
  hasFreeAccount: Scalars['Boolean']
};


export type MutationCreateUserArgs = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  confirmPassword: Scalars['String']
};


export type MutationLoginUserArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'],
  newPassword: Scalars['String'],
  confirmPassword: Scalars['String']
};

export type Name = {
   __typename?: 'Name',
  first?: Maybe<Scalars['String']>,
  last?: Maybe<Scalars['String']>,
};

export type Occasion = Document & {
   __typename?: 'Occasion',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  name?: Maybe<Scalars['String']>,
  parent?: Maybe<Occasion>,
  churchyear?: Maybe<Scalars['Boolean']>,
};

export type PageContent = Document & {
   __typename?: 'PageContent',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['JSON']>,
};

export type PageInfo = {
   __typename?: 'PageInfo',
  currentPage: Scalars['Int'],
  itemCount: Scalars['Int'],
  perPage: Scalars['Int'],
};

export type Prayer = Document & {
   __typename?: 'Prayer',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  title?: Maybe<Scalars['String']>,
  author?: Maybe<Author>,
  content?: Maybe<Scalars['JSON']>,
  note?: Maybe<Scalars['String']>,
  occasions?: Maybe<Array<Maybe<Occasion>>>,
  copyright?: Maybe<Copyright>,
  keywords?: Maybe<Array<Maybe<Keyword>>>,
  categories?: Maybe<Array<Maybe<Category>>>,
};

export type PrayerPagination = {
   __typename?: 'PrayerPagination',
  pageInfo?: Maybe<PageInfo>,
  items?: Maybe<Array<Maybe<Prayer>>>,
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  main?: Maybe<Main>,
  menuItems?: Maybe<Array<Maybe<MenuItem>>>,
  textSearch?: Maybe<Array<Maybe<SearchResult>>>,
  pageContentOne?: Maybe<PageContent>,
  authorById?: Maybe<Author>,
  hymnById?: Maybe<Hymn>,
  keywordById?: Maybe<Keyword>,
  liturgyById?: Maybe<Liturgy>,
  tuneMany?: Maybe<Array<Maybe<Tune>>>,
  prayerById?: Maybe<Prayer>,
  prayerPagination?: Maybe<PrayerPagination>,
};


export type QueryTextSearchArgs = {
  filter: FilterInput
};


export type QueryPageContentOneArgs = {
  filter: FilterInput
};


export type QueryAuthorByIdArgs = {
  id: Scalars['ID']
};


export type QueryHymnByIdArgs = {
  id: Scalars['ID']
};


export type QueryKeywordByIdArgs = {
  id: Scalars['ID']
};


export type QueryLiturgyByIdArgs = {
  id: Scalars['ID']
};


export type QueryTuneManyArgs = {
  filter?: Maybe<FilterInput>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  sort?: Maybe<TuneSortByInput>
};


export type QueryPrayerByIdArgs = {
  id: Scalars['ID']
};


export type QueryPrayerPaginationArgs = {
  page: Scalars['Int'],
  perPage: Scalars['Int']
};

export type RelativeUrl = Document & {
   __typename?: 'RelativeUrl',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  title?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
};

export type Resource = Document & {
   __typename?: 'Resource',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<ResourceType>,
};

export type ResourceType = Asset | RelativeUrl | ExternalUrl | PageContent;

export type Scripture = Document & {
   __typename?: 'Scripture',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['JSON']>,
  note?: Maybe<Scalars['JSON']>,
  translation?: Maybe<Scalars['String']>,
  occasions?: Maybe<Array<Maybe<Occasion>>>,
  keywords?: Maybe<Array<Maybe<Keyword>>>,
};

export type SearchResult = Hymn | Prayer | Liturgy | Scripture;

export type ShortList = Hymn | Prayer | Liturgy | Scripture;

export type Tune = Document & {
   __typename?: 'Tune',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  title?: Maybe<Scalars['String']>,
  metre?: Maybe<Metre>,
  composer?: Maybe<Author>,
  files?: Maybe<Array<Maybe<Asset>>>,
  musicCopyright?: Maybe<Copyright>,
};

export enum TuneSortByInput {
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type User = Document & {
   __typename?: 'User',
  _createdAt?: Maybe<Scalars['Date']>,
  _id: Scalars['ID'],
  _rev?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  name?: Maybe<Name>,
  email?: Maybe<Scalars['String']>,
  hasPaidAccount?: Maybe<Scalars['Boolean']>,
  hasFreeAccount?: Maybe<Scalars['Boolean']>,
  picture?: Maybe<Scalars['String']>,
  shortlist?: Maybe<Array<Maybe<ShortList>>>,
  role?: Maybe<Scalars['String']>,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => Maybe<TTypes>;

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
  Query: ResolverTypeWrapper<{}>,
  User: ResolverTypeWrapper<any>,
  Document: ResolverTypeWrapper<any>,
  Date: ResolverTypeWrapper<any>,
  ID: ResolverTypeWrapper<any>,
  String: ResolverTypeWrapper<any>,
  Name: ResolverTypeWrapper<any>,
  Boolean: ResolverTypeWrapper<any>,
  ShortList: ResolverTypeWrapper<any>,
  Hymn: ResolverTypeWrapper<any>,
  Author: ResolverTypeWrapper<any>,
  JSON: ResolverTypeWrapper<any>,
  Liturgy: ResolverTypeWrapper<any>,
  Asset: ResolverTypeWrapper<any>,
  Keyword: ResolverTypeWrapper<any>,
  Prayer: ResolverTypeWrapper<any>,
  Occasion: ResolverTypeWrapper<any>,
  Copyright: ResolverTypeWrapper<any>,
  Category: ResolverTypeWrapper<any>,
  Scripture: ResolverTypeWrapper<any>,
  Int: ResolverTypeWrapper<any>,
  Tune: ResolverTypeWrapper<any>,
  Metre: ResolverTypeWrapper<any>,
  Main: ResolverTypeWrapper<any>,
  FeaturedReference: ResolverTypeWrapper<any>,
  PageContent: ResolverTypeWrapper<any>,
  ExternalUrl: ResolverTypeWrapper<any>,
  RelativeUrl: ResolverTypeWrapper<any>,
  MenuItem: ResolverTypeWrapper<any>,
  ChildPageReference: ResolverTypeWrapper<any>,
  FilterInput: ResolverTypeWrapper<any>,
  SearchResult: ResolverTypeWrapper<any>,
  TuneSortByInput: ResolverTypeWrapper<any>,
  PrayerPagination: ResolverTypeWrapper<any>,
  PageInfo: ResolverTypeWrapper<any>,
  Mutation: ResolverTypeWrapper<{}>,
  Menu: ResolverTypeWrapper<any>,
  ResourceType: ResolverTypeWrapper<any>,
  Resource: ResolverTypeWrapper<any>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  User: any,
  Document: any,
  Date: any,
  ID: any,
  String: any,
  Name: any,
  Boolean: any,
  ShortList: any,
  Hymn: any,
  Author: any,
  JSON: any,
  Liturgy: any,
  Asset: any,
  Keyword: any,
  Prayer: any,
  Occasion: any,
  Copyright: any,
  Category: any,
  Scripture: any,
  Int: any,
  Tune: any,
  Metre: any,
  Main: any,
  FeaturedReference: any,
  PageContent: any,
  ExternalUrl: any,
  RelativeUrl: any,
  MenuItem: any,
  ChildPageReference: any,
  FilterInput: any,
  SearchResult: any,
  TuneSortByInput: any,
  PrayerPagination: any,
  PageInfo: any,
  Mutation: {},
  Menu: any,
  ResourceType: any,
  Resource: any,
};

export type AssetResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Asset'] = ResolversParentTypes['Asset']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  file?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type AuthorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  bio?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>,
  dates?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  hymns?: Resolver<Maybe<Array<Maybe<ResolversTypes['Hymn']>>>, ParentType, ContextType>,
  liturgies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Liturgy']>>>, ParentType, ContextType>,
  scripture?: Resolver<Maybe<Array<Maybe<ResolversTypes['Scripture']>>>, ParentType, ContextType>,
};

export type CategoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  parent?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>,
};

export type ChildPageReferenceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ChildPageReference'] = ResolversParentTypes['ChildPageReference']> = {
  __resolveType: TypeResolveFn<'PageContent' | 'Hymn' | 'Prayer' | 'Liturgy' | 'Scripture' | 'Asset', ParentType, ContextType>
};

export type CopyrightResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Copyright'] = ResolversParentTypes['Copyright']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type DocumentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = {
  __resolveType: TypeResolveFn<'User' | 'Hymn' | 'Author' | 'Liturgy' | 'Asset' | 'Keyword' | 'Prayer' | 'Occasion' | 'Copyright' | 'Category' | 'Scripture' | 'Tune' | 'Metre' | 'Main' | 'PageContent' | 'ExternalUrl' | 'RelativeUrl' | 'Menu' | 'Resource', ParentType, ContextType>,
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
};

export type ExternalUrlResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ExternalUrl'] = ResolversParentTypes['ExternalUrl']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type FeaturedReferenceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FeaturedReference'] = ResolversParentTypes['FeaturedReference']> = {
  __resolveType: TypeResolveFn<'PageContent' | 'ExternalUrl' | 'RelativeUrl', ParentType, ContextType>
};

export type HymnResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Hymn'] = ResolversParentTypes['Hymn']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>,
  hymnNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  content?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>,
  tune?: Resolver<Maybe<ResolversTypes['Tune']>, ParentType, ContextType>,
  book?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  chapter?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  chapterVerse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  files?: Resolver<Maybe<Array<Maybe<ResolversTypes['Asset']>>>, ParentType, ContextType>,
  keywords?: Resolver<Maybe<Array<Maybe<ResolversTypes['Keyword']>>>, ParentType, ContextType>,
  occasions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Occasion']>>>, ParentType, ContextType>,
  verses?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  copyright?: Resolver<Maybe<ResolversTypes['Copyright']>, ParentType, ContextType>,
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON'
}

export type KeywordResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Keyword'] = ResolversParentTypes['Keyword']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  hymns?: Resolver<Maybe<Array<Maybe<ResolversTypes['Hymn']>>>, ParentType, ContextType>,
  prayers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Prayer']>>>, ParentType, ContextType>,
  liturgies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Liturgy']>>>, ParentType, ContextType>,
};

export type LiturgyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Liturgy'] = ResolversParentTypes['Liturgy']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>,
  content?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>,
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  files?: Resolver<Maybe<Array<Maybe<ResolversTypes['Asset']>>>, ParentType, ContextType>,
  keywords?: Resolver<Maybe<Array<Maybe<ResolversTypes['Keyword']>>>, ParentType, ContextType>,
  occasions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Occasion']>>>, ParentType, ContextType>,
  copyright?: Resolver<Maybe<ResolversTypes['Copyright']>, ParentType, ContextType>,
};

export type MainResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Main'] = ResolversParentTypes['Main']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  heading?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  subheading?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  blurb?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>,
  searchblurb?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>,
  featured?: Resolver<Maybe<Array<Maybe<ResolversTypes['FeaturedReference']>>>, ParentType, ContextType>,
  menuItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenuItem']>>>, ParentType, ContextType>,
};

export type MenuResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Menu'] = ResolversParentTypes['Menu']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  link?: Resolver<Maybe<ResolversTypes['PageContent']>, ParentType, ContextType>,
};

export type MenuItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MenuItem'] = ResolversParentTypes['MenuItem']> = {
  _key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  childpages?: Resolver<Maybe<Array<Maybe<ResolversTypes['ChildPageReference']>>>, ParentType, ContextType>,
};

export type MetreResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Metre'] = ResolversParentTypes['Metre']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  metre?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addShortListItem?: Resolver<Maybe<Array<Maybe<ResolversTypes['ShortList']>>>, ParentType, ContextType, RequireFields<MutationAddShortListItemArgs, 'hymn'>>,
  removeShortListItem?: Resolver<Maybe<Array<Maybe<ResolversTypes['ShortList']>>>, ParentType, ContextType, RequireFields<MutationRemoveShortListItemArgs, 'hymn'>>,
  changeFreeAccount?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationChangeFreeAccountArgs, 'hasFreeAccount'>>,
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword'>>,
  loginUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'email' | 'password'>>,
  changePassword?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'password' | 'newPassword' | 'confirmPassword'>>,
};

export type NameResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Name'] = ResolversParentTypes['Name']> = {
  first?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  last?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type OccasionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Occasion'] = ResolversParentTypes['Occasion']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  parent?: Resolver<Maybe<ResolversTypes['Occasion']>, ParentType, ContextType>,
  churchyear?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
};

export type PageContentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageContent'] = ResolversParentTypes['PageContent']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  content?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>,
};

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  itemCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  perPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type PrayerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Prayer'] = ResolversParentTypes['Prayer']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>,
  content?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>,
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  occasions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Occasion']>>>, ParentType, ContextType>,
  copyright?: Resolver<Maybe<ResolversTypes['Copyright']>, ParentType, ContextType>,
  keywords?: Resolver<Maybe<Array<Maybe<ResolversTypes['Keyword']>>>, ParentType, ContextType>,
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>,
};

export type PrayerPaginationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PrayerPagination'] = ResolversParentTypes['PrayerPagination']> = {
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>,
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Prayer']>>>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  main?: Resolver<Maybe<ResolversTypes['Main']>, ParentType, ContextType>,
  menuItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['MenuItem']>>>, ParentType, ContextType>,
  textSearch?: Resolver<Maybe<Array<Maybe<ResolversTypes['SearchResult']>>>, ParentType, ContextType, RequireFields<QueryTextSearchArgs, 'filter'>>,
  pageContentOne?: Resolver<Maybe<ResolversTypes['PageContent']>, ParentType, ContextType, RequireFields<QueryPageContentOneArgs, 'filter'>>,
  authorById?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, RequireFields<QueryAuthorByIdArgs, 'id'>>,
  hymnById?: Resolver<Maybe<ResolversTypes['Hymn']>, ParentType, ContextType, RequireFields<QueryHymnByIdArgs, 'id'>>,
  keywordById?: Resolver<Maybe<ResolversTypes['Keyword']>, ParentType, ContextType, RequireFields<QueryKeywordByIdArgs, 'id'>>,
  liturgyById?: Resolver<Maybe<ResolversTypes['Liturgy']>, ParentType, ContextType, RequireFields<QueryLiturgyByIdArgs, 'id'>>,
  tuneMany?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tune']>>>, ParentType, ContextType, QueryTuneManyArgs>,
  prayerById?: Resolver<Maybe<ResolversTypes['Prayer']>, ParentType, ContextType, RequireFields<QueryPrayerByIdArgs, 'id'>>,
  prayerPagination?: Resolver<Maybe<ResolversTypes['PrayerPagination']>, ParentType, ContextType, RequireFields<QueryPrayerPaginationArgs, 'page' | 'perPage'>>,
};

export type RelativeUrlResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RelativeUrl'] = ResolversParentTypes['RelativeUrl']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type ResourceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Resource'] = ResolversParentTypes['Resource']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['ResourceType']>, ParentType, ContextType>,
};

export type ResourceTypeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ResourceType'] = ResolversParentTypes['ResourceType']> = {
  __resolveType: TypeResolveFn<'Asset' | 'RelativeUrl' | 'ExternalUrl' | 'PageContent', ParentType, ContextType>
};

export type ScriptureResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Scripture'] = ResolversParentTypes['Scripture']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  content?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>,
  note?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>,
  translation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  occasions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Occasion']>>>, ParentType, ContextType>,
  keywords?: Resolver<Maybe<Array<Maybe<ResolversTypes['Keyword']>>>, ParentType, ContextType>,
};

export type SearchResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']> = {
  __resolveType: TypeResolveFn<'Hymn' | 'Prayer' | 'Liturgy' | 'Scripture', ParentType, ContextType>
};

export type ShortListResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ShortList'] = ResolversParentTypes['ShortList']> = {
  __resolveType: TypeResolveFn<'Hymn' | 'Prayer' | 'Liturgy' | 'Scripture', ParentType, ContextType>
};

export type TuneResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Tune'] = ResolversParentTypes['Tune']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  metre?: Resolver<Maybe<ResolversTypes['Metre']>, ParentType, ContextType>,
  composer?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>,
  files?: Resolver<Maybe<Array<Maybe<ResolversTypes['Asset']>>>, ParentType, ContextType>,
  musicCopyright?: Resolver<Maybe<ResolversTypes['Copyright']>, ParentType, ContextType>,
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  _rev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  _updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['Name']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  hasPaidAccount?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  hasFreeAccount?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  shortlist?: Resolver<Maybe<Array<Maybe<ResolversTypes['ShortList']>>>, ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = Context> = {
  Asset?: AssetResolvers<ContextType>,
  Author?: AuthorResolvers<ContextType>,
  Category?: CategoryResolvers<ContextType>,
  ChildPageReference?: ChildPageReferenceResolvers,
  Copyright?: CopyrightResolvers<ContextType>,
  Date?: GraphQLScalarType,
  Document?: DocumentResolvers,
  ExternalUrl?: ExternalUrlResolvers<ContextType>,
  FeaturedReference?: FeaturedReferenceResolvers,
  Hymn?: HymnResolvers<ContextType>,
  JSON?: GraphQLScalarType,
  Keyword?: KeywordResolvers<ContextType>,
  Liturgy?: LiturgyResolvers<ContextType>,
  Main?: MainResolvers<ContextType>,
  Menu?: MenuResolvers<ContextType>,
  MenuItem?: MenuItemResolvers<ContextType>,
  Metre?: MetreResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Name?: NameResolvers<ContextType>,
  Occasion?: OccasionResolvers<ContextType>,
  PageContent?: PageContentResolvers<ContextType>,
  PageInfo?: PageInfoResolvers<ContextType>,
  Prayer?: PrayerResolvers<ContextType>,
  PrayerPagination?: PrayerPaginationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  RelativeUrl?: RelativeUrlResolvers<ContextType>,
  Resource?: ResourceResolvers<ContextType>,
  ResourceType?: ResourceTypeResolvers,
  Scripture?: ScriptureResolvers<ContextType>,
  SearchResult?: SearchResultResolvers,
  ShortList?: ShortListResolvers,
  Tune?: TuneResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
