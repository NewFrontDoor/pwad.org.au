/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;

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

export type AddShortListItemMutationVariables = {
  hymn: Scalars['ID']
};


export type AddShortListItemMutation = (
  { __typename?: 'Mutation' }
  & { addShortListItem: Maybe<Array<Maybe<(
    { __typename?: 'Hymn' }
    & Pick<Hymn, '_id' | 'title' | 'hymnNumber'>
  ) | { __typename?: 'Prayer' } | { __typename?: 'Liturgy' } | { __typename?: 'Scripture' }>>> }
);

export type ChangePasswordMutationVariables = {
  password: Scalars['String'],
  newPassword: Scalars['String'],
  confirmPassword: Scalars['String']
};


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_updatedAt'>
  )> }
);

export type CreateUserMutationVariables = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  confirmPassword: Scalars['String']
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'hasPaidAccount' | 'hasFreeAccount' | 'picture'>
    & { name: Maybe<(
      { __typename?: 'Name' }
      & Pick<Name, 'first' | 'last'>
    )> }
  )> }
);

export type FindOneAuthorQueryVariables = {
  id: Scalars['ID']
};


export type FindOneAuthorQuery = (
  { __typename?: 'Query' }
  & { authorById: Maybe<(
    { __typename?: 'Author' }
    & Pick<Author, '_id' | '_type' | 'name' | 'dates'>
    & { hymns: Maybe<Array<Maybe<(
      { __typename?: 'Hymn' }
      & Pick<Hymn, '_id' | '_type' | 'title' | 'hymnNumber'>
    )>>>, liturgies: Maybe<Array<Maybe<(
      { __typename?: 'Liturgy' }
      & Pick<Liturgy, '_id' | '_type' | 'title'>
    )>>> }
  )> }
);

export type FindOneHymnQueryVariables = {
  id: Scalars['ID']
};


export type FindOneHymnQuery = (
  { __typename?: 'Query' }
  & { hymnById: Maybe<(
    { __typename?: 'Hymn' }
    & Pick<Hymn, '_id' | 'title' | 'hymnNumber' | 'content'>
    & { copyright: Maybe<(
      { __typename?: 'Copyright' }
      & Pick<Copyright, 'name'>
    )>, author: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, '_id' | 'dates' | 'name'>
    )>, tune: Maybe<(
      { __typename?: 'Tune' }
      & Pick<Tune, 'title'>
      & { musicCopyright: Maybe<(
        { __typename?: 'Copyright' }
        & Pick<Copyright, 'name'>
      )>, composer: Maybe<(
        { __typename?: 'Author' }
        & Pick<Author, '_id' | 'name'>
      )>, metre: Maybe<(
        { __typename?: 'Metre' }
        & Pick<Metre, 'metre'>
      )> }
    )>, files: Maybe<Array<Maybe<(
      { __typename?: 'Asset' }
      & Pick<Asset, '_id' | 'file'>
    )>>> }
  )> }
);

export type FindOneKeywordQueryVariables = {
  id: Scalars['ID']
};


export type FindOneKeywordQuery = (
  { __typename?: 'Query' }
  & { keywordById: Maybe<(
    { __typename?: 'Keyword' }
    & Pick<Keyword, 'name'>
    & { hymns: Maybe<Array<Maybe<(
      { __typename?: 'Hymn' }
      & Pick<Hymn, '_id' | 'title' | 'hymnNumber'>
    )>>>, prayers: Maybe<Array<Maybe<(
      { __typename?: 'Prayer' }
      & Pick<Prayer, '_id' | 'title'>
    )>>>, liturgies: Maybe<Array<Maybe<(
      { __typename?: 'Liturgy' }
      & Pick<Liturgy, '_id' | 'title'>
    )>>> }
  )> }
);

export type FindOneLiturgyQueryVariables = {
  id: Scalars['ID']
};


export type FindOneLiturgyQuery = (
  { __typename?: 'Query' }
  & { liturgyById: Maybe<(
    { __typename?: 'Liturgy' }
    & Pick<Liturgy, '_id' | 'title' | 'content'>
    & { author: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, '_id' | 'dates' | 'name'>
    )>, copyright: Maybe<(
      { __typename?: 'Copyright' }
      & Pick<Copyright, 'name'>
    )>, files: Maybe<Array<Maybe<(
      { __typename?: 'Asset' }
      & Pick<Asset, '_id' | 'file'>
    )>>> }
  )> }
);

export type FindOnePrayerQueryVariables = {
  id: Scalars['ID']
};


export type FindOnePrayerQuery = (
  { __typename?: 'Query' }
  & { prayerById: Maybe<(
    { __typename?: 'Prayer' }
    & Pick<Prayer, '_id' | 'title' | 'content'>
    & { author: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, '_id' | 'name' | 'dates'>
    )>, copyright: Maybe<(
      { __typename?: 'Copyright' }
      & Pick<Copyright, 'name'>
    )> }
  )> }
);

export type FindPrayerContentsQueryVariables = {
  page: Scalars['Int']
};


export type FindPrayerContentsQuery = (
  { __typename?: 'Query' }
  & { prayerPagination: Maybe<(
    { __typename?: 'PrayerPagination' }
    & { pageInfo: Maybe<(
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'currentPage' | 'itemCount' | 'perPage'>
    )>, items: Maybe<Array<Maybe<(
      { __typename?: 'Prayer' }
      & Pick<Prayer, '_id' | 'title' | 'content'>
    )>>> }
  )> }
);

export type ChangeFreeAccountMutationVariables = {
  hasFreeAccount: Scalars['Boolean']
};


export type ChangeFreeAccountMutation = (
  { __typename?: 'Mutation' }
  & { changeFreeAccount: Maybe<(
    { __typename: 'User' }
    & Pick<User, 'hasFreeAccount'>
  )> }
);

export type HomeQueryVariables = {};


export type HomeQuery = (
  { __typename?: 'Query' }
  & { main: Maybe<(
    { __typename?: 'Main' }
    & Pick<Main, 'heading' | 'subheading' | 'blurb' | 'searchblurb'>
    & { menuItems: Maybe<Array<Maybe<(
      { __typename?: 'MenuItem' }
      & Pick<MenuItem, '_key' | 'text'>
      & { childpages: Maybe<Array<Maybe<(
        { __typename?: 'PageContent' }
        & Pick<PageContent, '_id' | 'title'>
      ) | { __typename?: 'Hymn' } | { __typename?: 'Prayer' } | { __typename?: 'Liturgy' } | { __typename?: 'Scripture' } | { __typename?: 'Asset' }>>> }
    )>>> }
  )> }
);

export type LoginUserMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'hasPaidAccount' | 'hasFreeAccount' | 'picture'>
    & { name: Maybe<(
      { __typename?: 'Name' }
      & Pick<Name, 'first' | 'last'>
    )> }
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'role' | 'hasFreeAccount' | 'picture'>
    & { name: Maybe<(
      { __typename?: 'Name' }
      & Pick<Name, 'first' | 'last'>
    )>, shortlist: Maybe<Array<Maybe<(
      { __typename?: 'Hymn' }
      & Pick<Hymn, '_id' | 'title' | 'hymnNumber'>
    ) | (
      { __typename?: 'Prayer' }
      & Pick<Prayer, '_id'>
    ) | (
      { __typename?: 'Liturgy' }
      & Pick<Liturgy, '_id'>
    ) | (
      { __typename?: 'Scripture' }
      & Pick<Scripture, '_id'>
    )>>> }
  )> }
);

export type PageContentQueryVariables = {
  page?: Maybe<Scalars['String']>
};


export type PageContentQuery = (
  { __typename?: 'Query' }
  & { pageContentOne: Maybe<(
    { __typename?: 'PageContent' }
    & Pick<PageContent, '_id' | 'title' | 'content'>
  )> }
);

export type RemoveShortListItemMutationVariables = {
  hymn: Scalars['ID']
};


export type RemoveShortListItemMutation = (
  { __typename?: 'Mutation' }
  & { removeShortListItem: Maybe<Array<Maybe<(
    { __typename?: 'Hymn' }
    & Pick<Hymn, '_id' | 'title' | 'hymnNumber'>
  ) | { __typename?: 'Prayer' } | { __typename?: 'Liturgy' } | { __typename?: 'Scripture' }>>> }
);

export type TextSearchQueryVariables = {
  search?: Maybe<Scalars['String']>
};


export type TextSearchQuery = (
  { __typename?: 'Query' }
  & { textSearch: Maybe<Array<Maybe<(
    { __typename?: 'Hymn' }
    & Pick<Hymn, '_id' | '_type' | 'title' | 'content'>
    & { keywords: Maybe<Array<Maybe<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, '_id' | 'name'>
    )>>> }
  ) | (
    { __typename?: 'Prayer' }
    & Pick<Prayer, '_id' | '_type' | 'title' | 'content'>
    & { keywords: Maybe<Array<Maybe<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, '_id' | 'name'>
    )>>> }
  ) | (
    { __typename?: 'Liturgy' }
    & Pick<Liturgy, '_id' | '_type' | 'title' | 'content'>
    & { keywords: Maybe<Array<Maybe<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, '_id' | 'name'>
    )>>> }
  ) | (
    { __typename?: 'Scripture' }
    & Pick<Scripture, '_id' | '_type'>
  )>>> }
);


export const AddShortListItemDocument = gql`
    mutation addShortListItem($hymn: ID!) {
  addShortListItem(hymn: $hymn) {
    ... on Hymn {
      _id
      title
      hymnNumber
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
 *      hymn: // value for 'hymn'
 *   },
 * });
 */
export function useAddShortListItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddShortListItemMutation, AddShortListItemMutationVariables>) {
        return ApolloReactHooks.useMutation<AddShortListItemMutation, AddShortListItemMutationVariables>(AddShortListItemDocument, baseOptions);
      }
export type AddShortListItemMutationHookResult = ReturnType<typeof useAddShortListItemMutation>;
export type AddShortListItemMutationResult = ApolloReactCommon.MutationResult<AddShortListItemMutation>;
export type AddShortListItemMutationOptions = ApolloReactCommon.BaseMutationOptions<AddShortListItemMutation, AddShortListItemMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword($password: String!, $newPassword: String!, $confirmPassword: String!) {
  changePassword(password: $password, newPassword: $newPassword, confirmPassword: $confirmPassword) {
    _updatedAt
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
 *      password: // value for 'password'
 *      newPassword: // value for 'newPassword'
 *      confirmPassword: // value for 'confirmPassword'
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
      name
    }
    content
    author {
      _id
      dates
      name
    }
    tune {
      title
      musicCopyright {
        name
      }
      composer {
        _id
        name
      }
      metre {
        metre
      }
    }
    files {
      _id
      file
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
      title
      hymnNumber
    }
    prayers {
      _id
      title
    }
    liturgies {
      _id
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
      name
    }
    files {
      _id
      file
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
        ... on PageContent {
          _id
          title
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
export const LoginUserDocument = gql`
    mutation loginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
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
export type LoginUserMutationFn = ApolloReactCommon.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, baseOptions);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = ApolloReactCommon.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    _id
    email
    role
    hasFreeAccount
    picture
    name {
      first
      last
    }
    shortlist {
      ... on Hymn {
        _id
        title
        hymnNumber
      }
      ... on Prayer {
        _id
      }
      ... on Liturgy {
        _id
      }
      ... on Scripture {
        _id
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
    query pageContent($page: String) {
  pageContentOne(filter: {id: $page}) {
    _id
    title
    content
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
 *      page: // value for 'page'
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
export const RemoveShortListItemDocument = gql`
    mutation removeShortListItem($hymn: ID!) {
  removeShortListItem(hymn: $hymn) {
    ... on Hymn {
      _id
      title
      hymnNumber
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
 *      hymn: // value for 'hymn'
 *   },
 * });
 */
export function useRemoveShortListItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveShortListItemMutation, RemoveShortListItemMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveShortListItemMutation, RemoveShortListItemMutationVariables>(RemoveShortListItemDocument, baseOptions);
      }
export type RemoveShortListItemMutationHookResult = ReturnType<typeof useRemoveShortListItemMutation>;
export type RemoveShortListItemMutationResult = ApolloReactCommon.MutationResult<RemoveShortListItemMutation>;
export type RemoveShortListItemMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveShortListItemMutation, RemoveShortListItemMutationVariables>;
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