/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;

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

export type ChildPage = {
   __typename?: 'ChildPage';
  _id: Scalars['ID'];
  childPage?: Maybe<ChildPageReference>;
  alternateText?: Maybe<Scalars['String']>;
};

export type ChildPageReference = PageContent | Hymn | Prayer | Liturgy | Scripture | Asset;

export type Copyright = Document & {
   __typename?: 'Copyright';
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
  name?: Maybe<Scalars['String']>;
};


export type Document = {
  _createdAt?: Maybe<Scalars['Date']>;
  _id: Scalars['ID'];
  _rev?: Maybe<Scalars['String']>;
  _type?: Maybe<Scalars['String']>;
  _updatedAt?: Maybe<Scalars['Date']>;
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

export type FeaturedReference = PageContent | ExternalUrl | RelativeUrl;

export type FilterInput = {
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
  textContains?: Maybe<Scalars['String']>;
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

export enum InvoiceStatus {
  Draft = 'draft',
  Open = 'open',
  Paid = 'paid',
  Uncollectible = 'uncollectible',
  Void = 'void'
}


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

export type MenuItem = {
   __typename?: 'MenuItem';
  _key?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  childpages?: Maybe<Array<Maybe<ChildPage>>>;
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

export type MetreIn = {
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum MetreSortBy {
  MetreAsc = 'metre_ASC',
  MetreDesc = 'metre_DESC'
}

export type Mutation = {
   __typename?: 'Mutation';
  addShortListItem?: Maybe<Array<Maybe<ShortList>>>;
  removeShortListItem?: Maybe<Array<Maybe<ShortList>>>;
  changeFreeAccount?: Maybe<User>;
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


export type MutationCreateUserArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type Name = {
   __typename?: 'Name';
  first?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
};

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

export type OccasionGroupedById = {
   __typename?: 'OccasionGroupedById';
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Occasion>>>;
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

export type PageInfo = {
   __typename?: 'PageInfo';
  currentPage: Scalars['Int'];
  itemCount: Scalars['Int'];
  perPage: Scalars['Int'];
};

export type PasswordChangeTicket = {
   __typename?: 'PasswordChangeTicket';
  ticket?: Maybe<Scalars['String']>;
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

export type ResourceType = Asset | RelativeUrl | ExternalUrl | PageContent;

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

export type SearchResult = Hymn | Prayer | Liturgy | Scripture;

export type ShortList = Hymn | Prayer | Liturgy | Scripture;

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
  invoiceStatus?: Maybe<InvoiceStatus>;
  stripeCustomerId?: Maybe<Scalars['String']>;
};

export type AddShortListItemMutationVariables = {
  item: Scalars['ID'];
};


export type AddShortListItemMutation = (
  { __typename?: 'Mutation' }
  & { addShortListItem?: Maybe<Array<Maybe<(
    { __typename?: 'Hymn' }
    & Pick<Hymn, '_id' | '_type' | 'title' | 'hymnNumber'>
  ) | (
    { __typename?: 'Prayer' }
    & Pick<Prayer, '_id' | '_type' | 'title'>
  ) | (
    { __typename?: 'Liturgy' }
    & Pick<Liturgy, '_id' | '_type' | 'title'>
  ) | (
    { __typename?: 'Scripture' }
    & Pick<Scripture, '_id' | '_type' | 'title'>
  )>>> }
);

export type AdvancedSearchQueryVariables = {
  title?: Maybe<Scalars['String']>;
  tune?: Maybe<Scalars['String']>;
  metres?: Maybe<Array<Maybe<Scalars['String']>>>;
  occasion?: Maybe<Scalars['String']>;
  keyword?: Maybe<Scalars['String']>;
  book?: Maybe<EnumHymnBook>;
};


export type AdvancedSearchQuery = (
  { __typename?: 'Query' }
  & { search?: Maybe<Array<Maybe<(
    { __typename?: 'Hymn' }
    & Pick<Hymn, '_id' | '_type' | 'title' | 'content' | 'hymnNumber'>
    & { keywords?: Maybe<Array<Maybe<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, '_id' | 'name'>
    )>>> }
  ) | (
    { __typename?: 'Prayer' }
    & Pick<Prayer, '_id' | '_type' | 'title' | 'content'>
    & { keywords?: Maybe<Array<Maybe<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, '_id' | 'name'>
    )>>> }
  ) | (
    { __typename?: 'Liturgy' }
    & Pick<Liturgy, '_id' | '_type' | 'title' | 'content'>
    & { keywords?: Maybe<Array<Maybe<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, '_id' | 'name'>
    )>>> }
  ) | (
    { __typename?: 'Scripture' }
    & Pick<Scripture, '_id' | '_type'>
  )>>> }
);

export type CancelSubscriptionMutationVariables = {};


export type CancelSubscriptionMutation = (
  { __typename?: 'Mutation' }
  & { cancelSubscription?: Maybe<(
    { __typename?: 'StripeSubscription' }
    & Pick<StripeSubscription, 'id' | 'status' | 'startDate' | 'cancelAt' | 'canceledAt' | 'currentPeriodEnd' | 'plan'>
  )> }
);

export type ChangePasswordMutationVariables = {};


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword?: Maybe<(
    { __typename?: 'PasswordChangeTicket' }
    & Pick<PasswordChangeTicket, 'ticket'>
  )> }
);

export type CreateUserMutationVariables = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'hasPaidAccount' | 'hasFreeAccount' | 'picture'>
    & { name?: Maybe<(
      { __typename?: 'Name' }
      & Pick<Name, 'first' | 'last'>
    )> }
  )> }
);

export type CurrentSubscriptionQueryVariables = {};


export type CurrentSubscriptionQuery = (
  { __typename?: 'Query' }
  & { subscription?: Maybe<(
    { __typename?: 'StripeSubscription' }
    & Pick<StripeSubscription, 'id' | 'status' | 'startDate' | 'cancelAt' | 'canceledAt' | 'currentPeriodEnd' | 'plan'>
  )> }
);

export type FindKeywordQueryVariables = {
  title?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type FindKeywordQuery = (
  { __typename?: 'Query' }
  & { keywordMany?: Maybe<Array<Maybe<(
    { __typename?: 'Keyword' }
    & Pick<Keyword, '_id' | 'name'>
  )>>> }
);

export type FindMetreQueryVariables = {
  metre?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type FindMetreQuery = (
  { __typename?: 'Query' }
  & { metreMany?: Maybe<Array<Maybe<(
    { __typename?: 'Metre' }
    & Pick<Metre, '_id' | 'metre'>
  )>>> }
);

export type FindOccasionQueryVariables = {};


export type FindOccasionQuery = (
  { __typename?: 'Query' }
  & { occasionManyGroupById?: Maybe<Array<Maybe<(
    { __typename?: 'OccasionGroupedById' }
    & Pick<OccasionGroupedById, 'name'>
    & { values?: Maybe<Array<Maybe<(
      { __typename?: 'Occasion' }
      & Pick<Occasion, '_id' | 'name'>
    )>>> }
  )>>> }
);

export type FindOneAuthorQueryVariables = {
  id: Scalars['ID'];
};


export type FindOneAuthorQuery = (
  { __typename?: 'Query' }
  & { authorById?: Maybe<(
    { __typename?: 'Author' }
    & Pick<Author, '_id' | '_type' | 'name' | 'dates'>
    & { hymns?: Maybe<Array<Maybe<(
      { __typename?: 'Hymn' }
      & Pick<Hymn, '_id' | '_type' | 'title' | 'hymnNumber'>
    )>>>, liturgies?: Maybe<Array<Maybe<(
      { __typename?: 'Liturgy' }
      & Pick<Liturgy, '_id' | '_type' | 'title'>
    )>>> }
  )> }
);

export type FindOneHymnQueryVariables = {
  id: Scalars['ID'];
};


export type FindOneHymnQuery = (
  { __typename?: 'Query' }
  & { hymnById?: Maybe<(
    { __typename?: 'Hymn' }
    & Pick<Hymn, '_id' | 'title' | 'hymnNumber' | 'content' | 'scripture'>
    & { copyright?: Maybe<(
      { __typename?: 'Copyright' }
      & Pick<Copyright, '_id' | 'name'>
    )>, author?: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, '_id' | 'dates' | 'name'>
    )>, alternateTunes?: Maybe<Array<Maybe<(
      { __typename?: 'Tune' }
      & Pick<Tune, '_id' | '_type' | 'title'>
      & { file?: Maybe<(
        { __typename?: 'Asset' }
        & Pick<Asset, '_id' | '_type' | 'name' | 'size' | 'url'>
      )> }
    )>>>, tune?: Maybe<(
      { __typename?: 'Tune' }
      & Pick<Tune, '_id' | 'title'>
      & { musicCopyright?: Maybe<(
        { __typename?: 'Copyright' }
        & Pick<Copyright, '_id' | 'name'>
      )>, composer?: Maybe<(
        { __typename?: 'Author' }
        & Pick<Author, '_id' | 'name'>
      )>, metre?: Maybe<(
        { __typename?: 'Metre' }
        & Pick<Metre, '_id' | 'metre'>
      )>, file?: Maybe<(
        { __typename?: 'Asset' }
        & Pick<Asset, '_id' | '_type' | 'name' | 'size' | 'url'>
      )> }
    )>, files?: Maybe<Array<Maybe<(
      { __typename?: 'Asset' }
      & Pick<Asset, '_id' | '_type' | 'name' | 'size' | 'url'>
    )>>> }
  )> }
);

export type FindOneKeywordQueryVariables = {
  id: Scalars['ID'];
};


export type FindOneKeywordQuery = (
  { __typename?: 'Query' }
  & { keywordById?: Maybe<(
    { __typename?: 'Keyword' }
    & Pick<Keyword, 'name'>
    & { hymns?: Maybe<Array<Maybe<(
      { __typename?: 'Hymn' }
      & Pick<Hymn, '_id' | '_type' | 'title' | 'hymnNumber'>
    )>>>, prayers?: Maybe<Array<Maybe<(
      { __typename?: 'Prayer' }
      & Pick<Prayer, '_id' | '_type' | 'title'>
    )>>>, liturgies?: Maybe<Array<Maybe<(
      { __typename?: 'Liturgy' }
      & Pick<Liturgy, '_id' | '_type' | 'title'>
    )>>> }
  )> }
);

export type FindOneLiturgyQueryVariables = {
  id: Scalars['ID'];
};


export type FindOneLiturgyQuery = (
  { __typename?: 'Query' }
  & { liturgyById?: Maybe<(
    { __typename?: 'Liturgy' }
    & Pick<Liturgy, '_id' | 'title' | 'content'>
    & { author?: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, '_id' | 'dates' | 'name'>
    )>, copyright?: Maybe<(
      { __typename?: 'Copyright' }
      & Pick<Copyright, '_id' | 'name'>
    )>, files?: Maybe<Array<Maybe<(
      { __typename?: 'Asset' }
      & Pick<Asset, '_id' | 'name' | 'size' | 'url'>
    )>>> }
  )> }
);

export type FindOnePrayerQueryVariables = {
  id: Scalars['ID'];
};


export type FindOnePrayerQuery = (
  { __typename?: 'Query' }
  & { prayerById?: Maybe<(
    { __typename?: 'Prayer' }
    & Pick<Prayer, '_id' | 'title' | 'content'>
    & { author?: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, '_id' | 'name' | 'dates'>
    )>, copyright?: Maybe<(
      { __typename?: 'Copyright' }
      & Pick<Copyright, '_id' | 'name'>
    )> }
  )> }
);

export type FindOneScriptureQueryVariables = {
  id: Scalars['ID'];
};


export type FindOneScriptureQuery = (
  { __typename?: 'Query' }
  & { scriptureById?: Maybe<(
    { __typename?: 'Scripture' }
    & Pick<Scripture, '_id' | 'title' | 'content'>
  )> }
);

export type FindPrayerContentsQueryVariables = {
  page: Scalars['Int'];
};


export type FindPrayerContentsQuery = (
  { __typename?: 'Query' }
  & { prayerPagination?: Maybe<(
    { __typename?: 'PrayerPagination' }
    & { pageInfo?: Maybe<(
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'currentPage' | 'itemCount' | 'perPage'>
    )>, items?: Maybe<Array<Maybe<(
      { __typename?: 'Prayer' }
      & Pick<Prayer, '_id' | 'title' | 'content'>
    )>>> }
  )> }
);

export type FindTuneQueryVariables = {
  title?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type FindTuneQuery = (
  { __typename?: 'Query' }
  & { tuneMany?: Maybe<Array<Maybe<(
    { __typename?: 'Tune' }
    & Pick<Tune, '_id' | 'title'>
  )>>> }
);

export type ChangeFreeAccountMutationVariables = {
  hasFreeAccount: Scalars['Boolean'];
};


export type ChangeFreeAccountMutation = (
  { __typename?: 'Mutation' }
  & { changeFreeAccount?: Maybe<(
    { __typename: 'User' }
    & Pick<User, 'hasFreeAccount'>
  )> }
);

export type HomeQueryVariables = {};


export type HomeQuery = (
  { __typename?: 'Query' }
  & { main?: Maybe<(
    { __typename?: 'Main' }
    & Pick<Main, 'heading' | 'subheading' | 'blurb' | 'searchblurb'>
    & { menuItems?: Maybe<Array<Maybe<(
      { __typename?: 'MenuItem' }
      & Pick<MenuItem, '_key' | 'text'>
      & { childpages?: Maybe<Array<Maybe<(
        { __typename?: 'ChildPage' }
        & Pick<ChildPage, '_id' | 'alternateText'>
        & { childPage?: Maybe<(
          { __typename?: 'PageContent' }
          & Pick<PageContent, '_id' | '_type' | 'slug' | 'title'>
        ) | { __typename?: 'Hymn' } | { __typename?: 'Prayer' } | { __typename?: 'Liturgy' } | { __typename?: 'Scripture' } | (
          { __typename?: 'Asset' }
          & Pick<Asset, '_id' | '_type' | 'name' | 'url'>
        )> }
      )>>> }
    )>>> }
  )> }
);

export type LiturgySearchQueryVariables = {
  title?: Maybe<Scalars['String']>;
  occasion?: Maybe<Scalars['String']>;
  keyword?: Maybe<Scalars['String']>;
};


export type LiturgySearchQuery = (
  { __typename?: 'Query' }
  & { liturgySearch?: Maybe<Array<Maybe<(
    { __typename?: 'Liturgy' }
    & Pick<Liturgy, '_id' | '_type' | 'title' | 'content'>
    & { keywords?: Maybe<Array<Maybe<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, '_id' | 'name'>
    )>>> }
  )>>> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'role' | 'hasFreeAccount' | 'hasPaidAccount' | 'picture' | 'periodEndDate' | 'stripeCustomerId'>
    & { name?: Maybe<(
      { __typename?: 'Name' }
      & Pick<Name, 'first' | 'last'>
    )>, shortlist?: Maybe<Array<Maybe<(
      { __typename?: 'Hymn' }
      & Pick<Hymn, '_id' | '_type' | 'title' | 'hymnNumber'>
    ) | (
      { __typename?: 'Prayer' }
      & Pick<Prayer, '_id' | '_type' | 'title'>
    ) | (
      { __typename?: 'Liturgy' }
      & Pick<Liturgy, '_id' | '_type' | 'title'>
    ) | (
      { __typename?: 'Scripture' }
      & Pick<Scripture, '_id' | '_type' | 'title'>
    )>>> }
  )> }
);

export type PageContentQueryVariables = {
  slug?: Maybe<Scalars['String']>;
};


export type PageContentQuery = (
  { __typename?: 'Query' }
  & { pageContentOne?: Maybe<(
    { __typename?: 'PageContent' }
    & Pick<PageContent, '_id' | 'title' | 'content' | 'hasToc' | 'slug' | 'subtitle'>
  )> }
);

export type PrayerSearchQueryVariables = {
  title?: Maybe<Scalars['String']>;
  occasion?: Maybe<Scalars['String']>;
  keyword?: Maybe<Scalars['String']>;
};


export type PrayerSearchQuery = (
  { __typename?: 'Query' }
  & { prayerSearch?: Maybe<Array<Maybe<(
    { __typename?: 'Prayer' }
    & Pick<Prayer, '_id' | '_type' | 'title' | 'content'>
    & { keywords?: Maybe<Array<Maybe<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, '_id' | 'name'>
    )>>> }
  )>>> }
);

export type RemoveShortListItemMutationVariables = {
  item: Scalars['ID'];
};


export type RemoveShortListItemMutation = (
  { __typename?: 'Mutation' }
  & { removeShortListItem?: Maybe<Array<Maybe<(
    { __typename?: 'Hymn' }
    & Pick<Hymn, '_id' | '_type' | 'title' | 'hymnNumber'>
  ) | (
    { __typename?: 'Prayer' }
    & Pick<Prayer, '_id' | '_type' | 'title'>
  ) | (
    { __typename?: 'Liturgy' }
    & Pick<Liturgy, '_id' | '_type' | 'title'>
  ) | (
    { __typename?: 'Scripture' }
    & Pick<Scripture, '_id' | '_type' | 'title'>
  )>>> }
);

export type StripeCheckoutSessionMutationVariables = {};


export type StripeCheckoutSessionMutation = (
  { __typename?: 'Mutation' }
  & { stripeCheckoutSession?: Maybe<(
    { __typename?: 'StripeCheckoutSession' }
    & Pick<StripeCheckoutSession, 'sessionId'>
  )> }
);

export type TextSearchQueryVariables = {
  search?: Maybe<Scalars['String']>;
};


export type TextSearchQuery = (
  { __typename?: 'Query' }
  & { textSearch?: Maybe<Array<Maybe<(
    { __typename?: 'Hymn' }
    & Pick<Hymn, '_id' | '_type' | 'title' | 'content' | 'hymnNumber'>
    & { keywords?: Maybe<Array<Maybe<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, '_id' | 'name'>
    )>>> }
  ) | (
    { __typename?: 'Prayer' }
    & Pick<Prayer, '_id' | '_type' | 'title' | 'content'>
    & { keywords?: Maybe<Array<Maybe<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, '_id' | 'name'>
    )>>> }
  ) | (
    { __typename?: 'Liturgy' }
    & Pick<Liturgy, '_id' | '_type' | 'title' | 'content'>
    & { keywords?: Maybe<Array<Maybe<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, '_id' | 'name'>
    )>>> }
  ) | (
    { __typename?: 'Scripture' }
    & Pick<Scripture, '_id' | '_type'>
  )>>> }
);


export const AddShortListItemDocument = gql`
    mutation addShortListItem($item: ID!) {
  addShortListItem(item: $item) {
    ... on Document {
      _id
      _type
    }
    ... on Hymn {
      title
      hymnNumber
    }
    ... on Liturgy {
      title
    }
    ... on Prayer {
      title
    }
    ... on Scripture {
      title
    }
  }
}
    `;
export type AddShortListItemMutationFn = ApolloReactCommon.MutationFunction<AddShortListItemMutation, AddShortListItemMutationVariables>;

/**
 * __useAddShortListItemMutation__
 *
 * To run a mutation, you first call `useAddShortListItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddShortListItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addShortListItemMutation, { data, loading, error }] = useAddShortListItemMutation({
 *   variables: {
 *      item: // value for 'item'
 *   },
 * });
 */
export function useAddShortListItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddShortListItemMutation, AddShortListItemMutationVariables>) {
        return ApolloReactHooks.useMutation<AddShortListItemMutation, AddShortListItemMutationVariables>(AddShortListItemDocument, baseOptions);
      }
export type AddShortListItemMutationHookResult = ReturnType<typeof useAddShortListItemMutation>;
export type AddShortListItemMutationResult = ApolloReactCommon.MutationResult<AddShortListItemMutation>;
export type AddShortListItemMutationOptions = ApolloReactCommon.BaseMutationOptions<AddShortListItemMutation, AddShortListItemMutationVariables>;
export const AdvancedSearchDocument = gql`
    query advancedSearch($title: String, $tune: String, $metres: [String], $occasion: String, $keyword: String, $book: EnumHymnBook) {
  search(filter: {textContains: $title, book: $book, tune: $tune, occasion: $occasion, keyword: $keyword, _operators: {metre: {in: $metres}}}) {
    ... on Document {
      _id
      _type
    }
    ... on Hymn {
      title
      content
      hymnNumber
      keywords {
        _id
        name
      }
    }
    ... on Prayer {
      title
      content
      keywords {
        _id
        name
      }
    }
    ... on Liturgy {
      title
      content
      keywords {
        _id
        name
      }
    }
  }
}
    `;

/**
 * __useAdvancedSearchQuery__
 *
 * To run a query within a React component, call `useAdvancedSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdvancedSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdvancedSearchQuery({
 *   variables: {
 *      title: // value for 'title'
 *      tune: // value for 'tune'
 *      metres: // value for 'metres'
 *      occasion: // value for 'occasion'
 *      keyword: // value for 'keyword'
 *      book: // value for 'book'
 *   },
 * });
 */
export function useAdvancedSearchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdvancedSearchQuery, AdvancedSearchQueryVariables>) {
        return ApolloReactHooks.useQuery<AdvancedSearchQuery, AdvancedSearchQueryVariables>(AdvancedSearchDocument, baseOptions);
      }
export function useAdvancedSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdvancedSearchQuery, AdvancedSearchQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AdvancedSearchQuery, AdvancedSearchQueryVariables>(AdvancedSearchDocument, baseOptions);
        }
export type AdvancedSearchQueryHookResult = ReturnType<typeof useAdvancedSearchQuery>;
export type AdvancedSearchLazyQueryHookResult = ReturnType<typeof useAdvancedSearchLazyQuery>;
export type AdvancedSearchQueryResult = ApolloReactCommon.QueryResult<AdvancedSearchQuery, AdvancedSearchQueryVariables>;
export const CancelSubscriptionDocument = gql`
    mutation cancelSubscription {
  cancelSubscription {
    id
    status
    startDate
    cancelAt
    canceledAt
    currentPeriodEnd
    plan
  }
}
    `;
export type CancelSubscriptionMutationFn = ApolloReactCommon.MutationFunction<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;

/**
 * __useCancelSubscriptionMutation__
 *
 * To run a mutation, you first call `useCancelSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelSubscriptionMutation, { data, loading, error }] = useCancelSubscriptionMutation({
 *   variables: {
 *   },
 * });
 */
export function useCancelSubscriptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>) {
        return ApolloReactHooks.useMutation<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>(CancelSubscriptionDocument, baseOptions);
      }
export type CancelSubscriptionMutationHookResult = ReturnType<typeof useCancelSubscriptionMutation>;
export type CancelSubscriptionMutationResult = ApolloReactCommon.MutationResult<CancelSubscriptionMutation>;
export type CancelSubscriptionMutationOptions = ApolloReactCommon.BaseMutationOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword {
  changePassword {
    ticket
  }
}
    `;
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $confirmPassword: String!) {
  createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, confirmPassword: $confirmPassword) {
    _id
    hasPaidAccount
    hasFreeAccount
    picture
    name {
      first
      last
    }
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const CurrentSubscriptionDocument = gql`
    query currentSubscription {
  subscription {
    id
    status
    startDate
    cancelAt
    canceledAt
    currentPeriodEnd
    plan
  }
}
    `;

/**
 * __useCurrentSubscriptionQuery__
 *
 * To run a query within a React component, call `useCurrentSubscriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentSubscriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentSubscriptionQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentSubscriptionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentSubscriptionQuery, CurrentSubscriptionQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentSubscriptionQuery, CurrentSubscriptionQueryVariables>(CurrentSubscriptionDocument, baseOptions);
      }
export function useCurrentSubscriptionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentSubscriptionQuery, CurrentSubscriptionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentSubscriptionQuery, CurrentSubscriptionQueryVariables>(CurrentSubscriptionDocument, baseOptions);
        }
export type CurrentSubscriptionQueryHookResult = ReturnType<typeof useCurrentSubscriptionQuery>;
export type CurrentSubscriptionLazyQueryHookResult = ReturnType<typeof useCurrentSubscriptionLazyQuery>;
export type CurrentSubscriptionQueryResult = ApolloReactCommon.QueryResult<CurrentSubscriptionQuery, CurrentSubscriptionQueryVariables>;
export const FindKeywordDocument = gql`
    query findKeyword($title: String, $skip: Int, $limit: Int) {
  keywordMany(filter: {textContains: $title}, limit: $limit, skip: $skip, sort: name_ASC) {
    _id
    name
  }
}
    `;

/**
 * __useFindKeywordQuery__
 *
 * To run a query within a React component, call `useFindKeywordQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindKeywordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindKeywordQuery({
 *   variables: {
 *      title: // value for 'title'
 *      skip: // value for 'skip'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFindKeywordQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindKeywordQuery, FindKeywordQueryVariables>) {
        return ApolloReactHooks.useQuery<FindKeywordQuery, FindKeywordQueryVariables>(FindKeywordDocument, baseOptions);
      }
export function useFindKeywordLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindKeywordQuery, FindKeywordQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindKeywordQuery, FindKeywordQueryVariables>(FindKeywordDocument, baseOptions);
        }
export type FindKeywordQueryHookResult = ReturnType<typeof useFindKeywordQuery>;
export type FindKeywordLazyQueryHookResult = ReturnType<typeof useFindKeywordLazyQuery>;
export type FindKeywordQueryResult = ApolloReactCommon.QueryResult<FindKeywordQuery, FindKeywordQueryVariables>;
export const FindMetreDocument = gql`
    query findMetre($metre: String, $skip: Int, $limit: Int) {
  metreMany(filter: {textContains: $metre}, limit: $limit, skip: $skip, sort: metre_ASC) {
    _id
    metre
  }
}
    `;

/**
 * __useFindMetreQuery__
 *
 * To run a query within a React component, call `useFindMetreQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMetreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMetreQuery({
 *   variables: {
 *      metre: // value for 'metre'
 *      skip: // value for 'skip'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFindMetreQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindMetreQuery, FindMetreQueryVariables>) {
        return ApolloReactHooks.useQuery<FindMetreQuery, FindMetreQueryVariables>(FindMetreDocument, baseOptions);
      }
export function useFindMetreLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindMetreQuery, FindMetreQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindMetreQuery, FindMetreQueryVariables>(FindMetreDocument, baseOptions);
        }
export type FindMetreQueryHookResult = ReturnType<typeof useFindMetreQuery>;
export type FindMetreLazyQueryHookResult = ReturnType<typeof useFindMetreLazyQuery>;
export type FindMetreQueryResult = ApolloReactCommon.QueryResult<FindMetreQuery, FindMetreQueryVariables>;
export const FindOccasionDocument = gql`
    query findOccasion {
  occasionManyGroupById {
    name
    values {
      _id
      name
    }
  }
}
    `;

/**
 * __useFindOccasionQuery__
 *
 * To run a query within a React component, call `useFindOccasionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOccasionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOccasionQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindOccasionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindOccasionQuery, FindOccasionQueryVariables>) {
        return ApolloReactHooks.useQuery<FindOccasionQuery, FindOccasionQueryVariables>(FindOccasionDocument, baseOptions);
      }
export function useFindOccasionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindOccasionQuery, FindOccasionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindOccasionQuery, FindOccasionQueryVariables>(FindOccasionDocument, baseOptions);
        }
export type FindOccasionQueryHookResult = ReturnType<typeof useFindOccasionQuery>;
export type FindOccasionLazyQueryHookResult = ReturnType<typeof useFindOccasionLazyQuery>;
export type FindOccasionQueryResult = ApolloReactCommon.QueryResult<FindOccasionQuery, FindOccasionQueryVariables>;
export const FindOneAuthorDocument = gql`
    query findOneAuthor($id: ID!) {
  authorById(id: $id) {
    _id
    _type
    name
    dates
    hymns {
      _id
      _type
      title
      hymnNumber
    }
    liturgies {
      _id
      _type
      title
    }
  }
}
    `;

/**
 * __useFindOneAuthorQuery__
 *
 * To run a query within a React component, call `useFindOneAuthorQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneAuthorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneAuthorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneAuthorQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindOneAuthorQuery, FindOneAuthorQueryVariables>) {
        return ApolloReactHooks.useQuery<FindOneAuthorQuery, FindOneAuthorQueryVariables>(FindOneAuthorDocument, baseOptions);
      }
export function useFindOneAuthorLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindOneAuthorQuery, FindOneAuthorQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindOneAuthorQuery, FindOneAuthorQueryVariables>(FindOneAuthorDocument, baseOptions);
        }
export type FindOneAuthorQueryHookResult = ReturnType<typeof useFindOneAuthorQuery>;
export type FindOneAuthorLazyQueryHookResult = ReturnType<typeof useFindOneAuthorLazyQuery>;
export type FindOneAuthorQueryResult = ApolloReactCommon.QueryResult<FindOneAuthorQuery, FindOneAuthorQueryVariables>;
export const FindOneHymnDocument = gql`
    query findOneHymn($id: ID!) {
  hymnById(id: $id) {
    _id
    title
    hymnNumber
    copyright {
      _id
      name
    }
    content
    scripture
    author {
      _id
      dates
      name
    }
    alternateTunes {
      _id
      _type
      title
      file {
        _id
        _type
        name
        size
        url
      }
    }
    tune {
      _id
      title
      musicCopyright {
        _id
        name
      }
      composer {
        _id
        name
      }
      metre {
        _id
        metre
      }
      file {
        _id
        _type
        name
        size
        url
      }
    }
    files {
      _id
      _type
      name
      size
      url
    }
  }
}
    `;

/**
 * __useFindOneHymnQuery__
 *
 * To run a query within a React component, call `useFindOneHymnQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneHymnQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneHymnQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneHymnQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindOneHymnQuery, FindOneHymnQueryVariables>) {
        return ApolloReactHooks.useQuery<FindOneHymnQuery, FindOneHymnQueryVariables>(FindOneHymnDocument, baseOptions);
      }
export function useFindOneHymnLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindOneHymnQuery, FindOneHymnQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindOneHymnQuery, FindOneHymnQueryVariables>(FindOneHymnDocument, baseOptions);
        }
export type FindOneHymnQueryHookResult = ReturnType<typeof useFindOneHymnQuery>;
export type FindOneHymnLazyQueryHookResult = ReturnType<typeof useFindOneHymnLazyQuery>;
export type FindOneHymnQueryResult = ApolloReactCommon.QueryResult<FindOneHymnQuery, FindOneHymnQueryVariables>;
export const FindOneKeywordDocument = gql`
    query findOneKeyword($id: ID!) {
  keywordById(id: $id) {
    name
    hymns {
      _id
      _type
      title
      hymnNumber
    }
    prayers {
      _id
      _type
      title
    }
    liturgies {
      _id
      _type
      title
    }
  }
}
    `;

/**
 * __useFindOneKeywordQuery__
 *
 * To run a query within a React component, call `useFindOneKeywordQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneKeywordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneKeywordQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneKeywordQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindOneKeywordQuery, FindOneKeywordQueryVariables>) {
        return ApolloReactHooks.useQuery<FindOneKeywordQuery, FindOneKeywordQueryVariables>(FindOneKeywordDocument, baseOptions);
      }
export function useFindOneKeywordLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindOneKeywordQuery, FindOneKeywordQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindOneKeywordQuery, FindOneKeywordQueryVariables>(FindOneKeywordDocument, baseOptions);
        }
export type FindOneKeywordQueryHookResult = ReturnType<typeof useFindOneKeywordQuery>;
export type FindOneKeywordLazyQueryHookResult = ReturnType<typeof useFindOneKeywordLazyQuery>;
export type FindOneKeywordQueryResult = ApolloReactCommon.QueryResult<FindOneKeywordQuery, FindOneKeywordQueryVariables>;
export const FindOneLiturgyDocument = gql`
    query findOneLiturgy($id: ID!) {
  liturgyById(id: $id) {
    _id
    title
    author {
      _id
      dates
      name
    }
    content
    copyright {
      _id
      name
    }
    files {
      _id
      name
      size
      url
    }
  }
}
    `;

/**
 * __useFindOneLiturgyQuery__
 *
 * To run a query within a React component, call `useFindOneLiturgyQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneLiturgyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneLiturgyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneLiturgyQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindOneLiturgyQuery, FindOneLiturgyQueryVariables>) {
        return ApolloReactHooks.useQuery<FindOneLiturgyQuery, FindOneLiturgyQueryVariables>(FindOneLiturgyDocument, baseOptions);
      }
export function useFindOneLiturgyLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindOneLiturgyQuery, FindOneLiturgyQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindOneLiturgyQuery, FindOneLiturgyQueryVariables>(FindOneLiturgyDocument, baseOptions);
        }
export type FindOneLiturgyQueryHookResult = ReturnType<typeof useFindOneLiturgyQuery>;
export type FindOneLiturgyLazyQueryHookResult = ReturnType<typeof useFindOneLiturgyLazyQuery>;
export type FindOneLiturgyQueryResult = ApolloReactCommon.QueryResult<FindOneLiturgyQuery, FindOneLiturgyQueryVariables>;
export const FindOnePrayerDocument = gql`
    query findOnePrayer($id: ID!) {
  prayerById(id: $id) {
    _id
    author {
      _id
      name
      dates
    }
    title
    content
    copyright {
      _id
      name
    }
  }
}
    `;

/**
 * __useFindOnePrayerQuery__
 *
 * To run a query within a React component, call `useFindOnePrayerQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOnePrayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOnePrayerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOnePrayerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindOnePrayerQuery, FindOnePrayerQueryVariables>) {
        return ApolloReactHooks.useQuery<FindOnePrayerQuery, FindOnePrayerQueryVariables>(FindOnePrayerDocument, baseOptions);
      }
export function useFindOnePrayerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindOnePrayerQuery, FindOnePrayerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindOnePrayerQuery, FindOnePrayerQueryVariables>(FindOnePrayerDocument, baseOptions);
        }
export type FindOnePrayerQueryHookResult = ReturnType<typeof useFindOnePrayerQuery>;
export type FindOnePrayerLazyQueryHookResult = ReturnType<typeof useFindOnePrayerLazyQuery>;
export type FindOnePrayerQueryResult = ApolloReactCommon.QueryResult<FindOnePrayerQuery, FindOnePrayerQueryVariables>;
export const FindOneScriptureDocument = gql`
    query findOneScripture($id: ID!) {
  scriptureById(id: $id) {
    _id
    title
    content
  }
}
    `;

/**
 * __useFindOneScriptureQuery__
 *
 * To run a query within a React component, call `useFindOneScriptureQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneScriptureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneScriptureQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneScriptureQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindOneScriptureQuery, FindOneScriptureQueryVariables>) {
        return ApolloReactHooks.useQuery<FindOneScriptureQuery, FindOneScriptureQueryVariables>(FindOneScriptureDocument, baseOptions);
      }
export function useFindOneScriptureLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindOneScriptureQuery, FindOneScriptureQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindOneScriptureQuery, FindOneScriptureQueryVariables>(FindOneScriptureDocument, baseOptions);
        }
export type FindOneScriptureQueryHookResult = ReturnType<typeof useFindOneScriptureQuery>;
export type FindOneScriptureLazyQueryHookResult = ReturnType<typeof useFindOneScriptureLazyQuery>;
export type FindOneScriptureQueryResult = ApolloReactCommon.QueryResult<FindOneScriptureQuery, FindOneScriptureQueryVariables>;
export const FindPrayerContentsDocument = gql`
    query findPrayerContents($page: Int!) {
  prayerPagination(page: $page, perPage: 20) {
    pageInfo {
      currentPage
      itemCount
      perPage
    }
    items {
      _id
      title
      content
    }
  }
}
    `;

/**
 * __useFindPrayerContentsQuery__
 *
 * To run a query within a React component, call `useFindPrayerContentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPrayerContentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPrayerContentsQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useFindPrayerContentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindPrayerContentsQuery, FindPrayerContentsQueryVariables>) {
        return ApolloReactHooks.useQuery<FindPrayerContentsQuery, FindPrayerContentsQueryVariables>(FindPrayerContentsDocument, baseOptions);
      }
export function useFindPrayerContentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindPrayerContentsQuery, FindPrayerContentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindPrayerContentsQuery, FindPrayerContentsQueryVariables>(FindPrayerContentsDocument, baseOptions);
        }
export type FindPrayerContentsQueryHookResult = ReturnType<typeof useFindPrayerContentsQuery>;
export type FindPrayerContentsLazyQueryHookResult = ReturnType<typeof useFindPrayerContentsLazyQuery>;
export type FindPrayerContentsQueryResult = ApolloReactCommon.QueryResult<FindPrayerContentsQuery, FindPrayerContentsQueryVariables>;
export const FindTuneDocument = gql`
    query findTune($title: String, $skip: Int, $limit: Int) {
  tuneMany(filter: {textContains: $title}, limit: $limit, skip: $skip, sort: title_ASC) {
    _id
    title
  }
}
    `;

/**
 * __useFindTuneQuery__
 *
 * To run a query within a React component, call `useFindTuneQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTuneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTuneQuery({
 *   variables: {
 *      title: // value for 'title'
 *      skip: // value for 'skip'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFindTuneQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindTuneQuery, FindTuneQueryVariables>) {
        return ApolloReactHooks.useQuery<FindTuneQuery, FindTuneQueryVariables>(FindTuneDocument, baseOptions);
      }
export function useFindTuneLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindTuneQuery, FindTuneQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FindTuneQuery, FindTuneQueryVariables>(FindTuneDocument, baseOptions);
        }
export type FindTuneQueryHookResult = ReturnType<typeof useFindTuneQuery>;
export type FindTuneLazyQueryHookResult = ReturnType<typeof useFindTuneLazyQuery>;
export type FindTuneQueryResult = ApolloReactCommon.QueryResult<FindTuneQuery, FindTuneQueryVariables>;
export const ChangeFreeAccountDocument = gql`
    mutation changeFreeAccount($hasFreeAccount: Boolean!) {
  changeFreeAccount(hasFreeAccount: $hasFreeAccount) {
    __typename
    hasFreeAccount
  }
}
    `;
export type ChangeFreeAccountMutationFn = ApolloReactCommon.MutationFunction<ChangeFreeAccountMutation, ChangeFreeAccountMutationVariables>;

/**
 * __useChangeFreeAccountMutation__
 *
 * To run a mutation, you first call `useChangeFreeAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeFreeAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeFreeAccountMutation, { data, loading, error }] = useChangeFreeAccountMutation({
 *   variables: {
 *      hasFreeAccount: // value for 'hasFreeAccount'
 *   },
 * });
 */
export function useChangeFreeAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangeFreeAccountMutation, ChangeFreeAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<ChangeFreeAccountMutation, ChangeFreeAccountMutationVariables>(ChangeFreeAccountDocument, baseOptions);
      }
export type ChangeFreeAccountMutationHookResult = ReturnType<typeof useChangeFreeAccountMutation>;
export type ChangeFreeAccountMutationResult = ApolloReactCommon.MutationResult<ChangeFreeAccountMutation>;
export type ChangeFreeAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangeFreeAccountMutation, ChangeFreeAccountMutationVariables>;
export const HomeDocument = gql`
    query Home {
  main {
    heading
    subheading
    blurb
    searchblurb
    menuItems {
      _key
      text
      childpages {
        _id
        alternateText
        childPage {
          ... on PageContent {
            _id
            _type
            slug
            title
          }
          ... on Asset {
            _id
            _type
            name
            url
          }
        }
      }
    }
  }
}
    `;

/**
 * __useHomeQuery__
 *
 * To run a query within a React component, call `useHomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HomeQuery, HomeQueryVariables>) {
        return ApolloReactHooks.useQuery<HomeQuery, HomeQueryVariables>(HomeDocument, baseOptions);
      }
export function useHomeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HomeQuery, HomeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HomeQuery, HomeQueryVariables>(HomeDocument, baseOptions);
        }
export type HomeQueryHookResult = ReturnType<typeof useHomeQuery>;
export type HomeLazyQueryHookResult = ReturnType<typeof useHomeLazyQuery>;
export type HomeQueryResult = ApolloReactCommon.QueryResult<HomeQuery, HomeQueryVariables>;
export const LiturgySearchDocument = gql`
    query liturgySearch($title: String, $occasion: String, $keyword: String) {
  liturgySearch(filter: {textContains: $title, occasion: $occasion, keyword: $keyword}) {
    _id
    _type
    title
    content
    keywords {
      _id
      name
    }
  }
}
    `;

/**
 * __useLiturgySearchQuery__
 *
 * To run a query within a React component, call `useLiturgySearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useLiturgySearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLiturgySearchQuery({
 *   variables: {
 *      title: // value for 'title'
 *      occasion: // value for 'occasion'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useLiturgySearchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LiturgySearchQuery, LiturgySearchQueryVariables>) {
        return ApolloReactHooks.useQuery<LiturgySearchQuery, LiturgySearchQueryVariables>(LiturgySearchDocument, baseOptions);
      }
export function useLiturgySearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LiturgySearchQuery, LiturgySearchQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LiturgySearchQuery, LiturgySearchQueryVariables>(LiturgySearchDocument, baseOptions);
        }
export type LiturgySearchQueryHookResult = ReturnType<typeof useLiturgySearchQuery>;
export type LiturgySearchLazyQueryHookResult = ReturnType<typeof useLiturgySearchLazyQuery>;
export type LiturgySearchQueryResult = ApolloReactCommon.QueryResult<LiturgySearchQuery, LiturgySearchQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    _id
    email
    role
    hasFreeAccount
    hasPaidAccount
    picture
    name {
      first
      last
    }
    periodEndDate
    stripeCustomerId
    shortlist {
      ... on Document {
        _id
        _type
      }
      ... on Hymn {
        title
        hymnNumber
      }
      ... on Prayer {
        title
      }
      ... on Liturgy {
        title
      }
      ... on Scripture {
        title
      }
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const PageContentDocument = gql`
    query pageContent($slug: String) {
  pageContentOne(filter: {slug: $slug}) {
    _id
    title
    content
    hasToc
    slug
    subtitle
  }
}
    `;

/**
 * __usePageContentQuery__
 *
 * To run a query within a React component, call `usePageContentQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageContentQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function usePageContentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PageContentQuery, PageContentQueryVariables>) {
        return ApolloReactHooks.useQuery<PageContentQuery, PageContentQueryVariables>(PageContentDocument, baseOptions);
      }
export function usePageContentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PageContentQuery, PageContentQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PageContentQuery, PageContentQueryVariables>(PageContentDocument, baseOptions);
        }
export type PageContentQueryHookResult = ReturnType<typeof usePageContentQuery>;
export type PageContentLazyQueryHookResult = ReturnType<typeof usePageContentLazyQuery>;
export type PageContentQueryResult = ApolloReactCommon.QueryResult<PageContentQuery, PageContentQueryVariables>;
export const PrayerSearchDocument = gql`
    query prayerSearch($title: String, $occasion: String, $keyword: String) {
  prayerSearch(filter: {textContains: $title, occasion: $occasion, keyword: $keyword}) {
    _id
    _type
    title
    content
    keywords {
      _id
      name
    }
  }
}
    `;

/**
 * __usePrayerSearchQuery__
 *
 * To run a query within a React component, call `usePrayerSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrayerSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrayerSearchQuery({
 *   variables: {
 *      title: // value for 'title'
 *      occasion: // value for 'occasion'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function usePrayerSearchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PrayerSearchQuery, PrayerSearchQueryVariables>) {
        return ApolloReactHooks.useQuery<PrayerSearchQuery, PrayerSearchQueryVariables>(PrayerSearchDocument, baseOptions);
      }
export function usePrayerSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PrayerSearchQuery, PrayerSearchQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PrayerSearchQuery, PrayerSearchQueryVariables>(PrayerSearchDocument, baseOptions);
        }
export type PrayerSearchQueryHookResult = ReturnType<typeof usePrayerSearchQuery>;
export type PrayerSearchLazyQueryHookResult = ReturnType<typeof usePrayerSearchLazyQuery>;
export type PrayerSearchQueryResult = ApolloReactCommon.QueryResult<PrayerSearchQuery, PrayerSearchQueryVariables>;
export const RemoveShortListItemDocument = gql`
    mutation removeShortListItem($item: ID!) {
  removeShortListItem(item: $item) {
    ... on Document {
      _id
      _type
    }
    ... on Hymn {
      title
      hymnNumber
    }
    ... on Liturgy {
      title
    }
    ... on Prayer {
      title
    }
    ... on Scripture {
      title
    }
  }
}
    `;
export type RemoveShortListItemMutationFn = ApolloReactCommon.MutationFunction<RemoveShortListItemMutation, RemoveShortListItemMutationVariables>;

/**
 * __useRemoveShortListItemMutation__
 *
 * To run a mutation, you first call `useRemoveShortListItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveShortListItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeShortListItemMutation, { data, loading, error }] = useRemoveShortListItemMutation({
 *   variables: {
 *      item: // value for 'item'
 *   },
 * });
 */
export function useRemoveShortListItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveShortListItemMutation, RemoveShortListItemMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveShortListItemMutation, RemoveShortListItemMutationVariables>(RemoveShortListItemDocument, baseOptions);
      }
export type RemoveShortListItemMutationHookResult = ReturnType<typeof useRemoveShortListItemMutation>;
export type RemoveShortListItemMutationResult = ApolloReactCommon.MutationResult<RemoveShortListItemMutation>;
export type RemoveShortListItemMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveShortListItemMutation, RemoveShortListItemMutationVariables>;
export const StripeCheckoutSessionDocument = gql`
    mutation stripeCheckoutSession {
  stripeCheckoutSession {
    sessionId
  }
}
    `;
export type StripeCheckoutSessionMutationFn = ApolloReactCommon.MutationFunction<StripeCheckoutSessionMutation, StripeCheckoutSessionMutationVariables>;

/**
 * __useStripeCheckoutSessionMutation__
 *
 * To run a mutation, you first call `useStripeCheckoutSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStripeCheckoutSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stripeCheckoutSessionMutation, { data, loading, error }] = useStripeCheckoutSessionMutation({
 *   variables: {
 *   },
 * });
 */
export function useStripeCheckoutSessionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StripeCheckoutSessionMutation, StripeCheckoutSessionMutationVariables>) {
        return ApolloReactHooks.useMutation<StripeCheckoutSessionMutation, StripeCheckoutSessionMutationVariables>(StripeCheckoutSessionDocument, baseOptions);
      }
export type StripeCheckoutSessionMutationHookResult = ReturnType<typeof useStripeCheckoutSessionMutation>;
export type StripeCheckoutSessionMutationResult = ApolloReactCommon.MutationResult<StripeCheckoutSessionMutation>;
export type StripeCheckoutSessionMutationOptions = ApolloReactCommon.BaseMutationOptions<StripeCheckoutSessionMutation, StripeCheckoutSessionMutationVariables>;
export const TextSearchDocument = gql`
    query textSearch($search: String) {
  textSearch(filter: {search: $search}) {
    ... on Document {
      _id
      _type
    }
    ... on Hymn {
      title
      content
      hymnNumber
      keywords {
        _id
        name
      }
    }
    ... on Prayer {
      title
      content
      keywords {
        _id
        name
      }
    }
    ... on Liturgy {
      title
      content
      keywords {
        _id
        name
      }
    }
  }
}
    `;

/**
 * __useTextSearchQuery__
 *
 * To run a query within a React component, call `useTextSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useTextSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTextSearchQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useTextSearchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TextSearchQuery, TextSearchQueryVariables>) {
        return ApolloReactHooks.useQuery<TextSearchQuery, TextSearchQueryVariables>(TextSearchDocument, baseOptions);
      }
export function useTextSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TextSearchQuery, TextSearchQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TextSearchQuery, TextSearchQueryVariables>(TextSearchDocument, baseOptions);
        }
export type TextSearchQueryHookResult = ReturnType<typeof useTextSearchQuery>;
export type TextSearchLazyQueryHookResult = ReturnType<typeof useTextSearchLazyQuery>;
export type TextSearchQueryResult = ApolloReactCommon.QueryResult<TextSearchQuery, TextSearchQueryVariables>;