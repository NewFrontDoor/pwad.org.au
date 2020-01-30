import gql from 'graphql-tag';

export const schema = gql`
  type Query {
    me: User
    main: Main
    occasionManyGroupById: [OccasionGroupedById]
    menuItems: [MenuItem]
    textSearch(filter: FilterInput!): [SearchResult]
    search(filter: SearchInput!): [SearchResult]

    pageContentOne(filter: FilterInput!): PageContent

    authorById(id: ID!): Author

    hymnById(id: ID!): Hymn

    keywordById(id: ID!): Keyword
    keywordMany(
      filter: FilterInput
      limit: Int
      skip: Int
      sort: KeywordSortBy
    ): [Keyword]

    liturgyById(id: ID!): Liturgy

    tuneMany(
      filter: FilterInput
      limit: Int
      skip: Int
      sort: TuneSortBy
    ): [Tune]

    metreMany(
      filter: FilterInput
      limit: Int
      skip: Int
      sort: MetreSortBy
    ): [Metre]

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

    makePayment(email: String!, password: String!): User
  }

  scalar Date

  scalar JSON

  union SearchResult = Hymn | Prayer | Liturgy | Scripture

  type OccasionGroupedById {
    _id: ID!
    name: String
    values: [Occasion]
  }

  input SearchInput {
    textContains: String
    book: EnumHymnBook
    occasion: String
    keywords: [String]
    _operators: SearchInputOperator
  }

  input SearchInputOperator {
    tune: TuneIn
  }

  input TuneIn {
    in: [String]
  }

  enum EnumHymnBook {
    none
    genesis
    exodus
    leviticus
    numbers
    deuteronomy
    joshua
    judges
    ruth
    first_samuel
    second_samuel
    first_kings
    second_kings
    first_chronicles
    second_chronicles
    ezra
    nehemiah
    esther
    job
    psalms
    proverbs
    ecclesiastes
    song_of_songs
    isaiah
    jeremiah
    lamentations
    ezekiel
    daniel
    hosea
    joel
    amos
    obadiah
    jonah
    micah
    nahum
    habakkuk
    zephaniah
    haggai
    zechariah
    malachi
    matthew
    mark
    luke
    john
    acts
    romans
    first_corinthians
    second_corinthians
    galatians
    ephesians
    philippians
    colossians
    first_thessalonians
    second_thessalonians
    first_timothy
    second_timothy
    titus
    philemon
    hebrews
    james
    first_peter
    second_peter
    first_john
    second_john
    third_john
    jude
    revelation
  }

  type PageInfo {
    currentPage: Int!
    itemCount: Int!
    perPage: Int!
  }

  input FilterInput {
    id: String
    search: String
    textContains: String
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
    scripture: String
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

  enum KeywordSortBy {
    name_ASC
    name_DESC
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
    tunes: [Tune]
  }

  enum MetreSortBy {
    metre_ASC
    metre_DESC
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

  enum TuneSortBy {
    title_ASC
    title_DESC
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
