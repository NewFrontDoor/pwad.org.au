import gql from 'graphql-tag';

export const schema = gql`
  type Query {
    me: User
    main: Main
    menuItems: [MenuItem]
    textSearch(filter: FilterInput!): [SearchResult]

    pageContentOne(filter: FilterInput!): PageContent

    authorById(id: ID!): Author
    hymnById(id: ID!): Hymn
    keywordById(id: ID!): Keyword
    liturgyById(id: ID!): Liturgy

    prayerById(id: ID!): Prayer
    prayerPagination(page: Int!, perPage: Int!): PrayerPagination
  }

  type Mutation {
    addShortListItem(hymn: ID!): [ShortList]
    removeShortListItem(hymn: ID!): [ShortList]
    changeFreeAccount(hasFreeAccount: Boolean!): User

    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User

    loginUser(email: String!, password: String!): User

    changePassword(
      password: String!
      newPassword: String!
      confirmPassword: String!
    ): User
  }

  scalar Date

  scalar JSON

  union SearchResult = Hymn | Prayer | Liturgy | Scripture

  type PageInfo {
    currentPage: Int!
    itemCount: Int!
    perPage: Int!
  }

  input FilterInput {
    id: String
    search: String
  }

  interface Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
  }

  union FeaturedReference = PageContent | ExternalUrl | RelativeUrl

  type Main implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    heading: String
    subheading: String
    blurb: JSON
    searchblurb: JSON
    featured: [FeaturedReference]
    menuItems: [MenuItem]
  }

  union ChildPageReference =
      PageContent
    | Hymn
    | Prayer
    | Liturgy
    | Scripture
    | Asset

  type MenuItem {
    _key: String
    text: String
    childpages: [ChildPageReference]
  }

  type Author implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    name: String
    bio: JSON
    dates: String
    hymns: [Hymn]
    liturgies: [Liturgy]
    scripture: [Scripture]
  }

  type Category implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    title: String
    parent: Category
  }

  type Copyright implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    name: String
  }

  type Hymn implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    title: String
    author: Author
    hymnNumber: Int
    content: JSON
    tune: Tune
    book: String
    chapter: Int
    chapterVerse: String
    files: [Asset]
    keywords: [Keyword]
    occasions: [Occasion]
    verses: String
    copyright: Copyright
  }

  type Keyword implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    name: String
    hymns: [Hymn]
    prayers: [Prayer]
    liturgies: [Liturgy]
  }

  type Liturgy implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    title: String
    author: Author
    content: JSON
    note: String
    files: [Asset]
    keywords: [Keyword]
    occasions: [Occasion]
    copyright: Copyright
  }

  type Menu implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    code: String
    name: String
    type: String
    link: PageContent
  }

  type Metre implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    metre: String
  }

  type Occasion implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    name: String
    parent: Occasion
    churchyear: Boolean
  }

  type Prayer implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    title: String
    author: Author
    content: JSON
    note: String
    occasions: [Occasion]
    copyright: Copyright
    keywords: [Keyword]
    categories: [Category]
  }

  type PrayerPagination {
    pageInfo: PageInfo
    items: [Prayer]
  }

  type Scripture implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    title: String
    content: JSON
    note: JSON
    translation: String
    occasions: [Occasion]
    keywords: [Keyword]
  }

  type Tune implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    title: String
    metre: Metre
    composer: Author
    files: [Asset]
    musicCopyright: Copyright
  }

  type Asset implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    name: String
    file: String
  }

  union ResourceType = Asset | RelativeUrl | ExternalUrl | PageContent

  type Resource implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    name: String
    type: ResourceType
  }

  type PageContent implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    title: String
    content: JSON
  }

  union ShortList = Hymn | Prayer | Liturgy | Scripture

  type Name {
    first: String
    last: String
  }

  type User implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    name: Name
    email: String
    hasPaidAccount: Boolean
    hasFreeAccount: Boolean
    picture: String
    shortlist: [ShortList]
    role: String
  }

  type RelativeUrl implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    title: String
    url: String
  }

  type ExternalUrl implements Document {
    _createdAt: Date
    _id: ID!
    _rev: String
    _type: String
    _updatedAt: Date
    title: String
    url: String
  }
`;
