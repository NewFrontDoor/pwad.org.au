export type Author = {
  _id: string;
  _type: "author";
  name: string;
  dates: string;
  hymns: Array<Pick<Hymn, "_id" | "_type" | "title" | "hymnNumber">>;
  liturgies: Array<Pick<Liturgy, "_id" | "_type">>;
};

export type Asset = {
  _id: string;
  _type: "asset";
  name: string;
  size: number;
  url: string;
};

export type Keyword = {
  _id: string;
  name?: string;
  hymns: Hymn[];
  prayers: Prayer[];
  liturgies: Liturgy[];
};

export type Category = {
  _id: string;
  name: string;
};

export type Liturgy = {
  _id: string;
  _type: "liturgy";
  title?: string;
  content: BlockContent[];
  files?: Asset[];
  keywords?: Keyword[];
  categories?: Category[];
  author?: Author;
  copyright?: Copyright;
};

export type Hymn = {
  _id: string;
  _type: "hymn";
  content: BlockContent[];
  author?: Author;
  tune?: Tune;
  alternateTunes?: Tune[];
  copyright?: Copyright;
  scripture?: string;
  title: string;
  hymnNumber: number;
  files?: Asset[];
  book?: string;
  chapter?: number;
  chapterVerse?: string;
  keywords?: Keyword[];
  occasions?: Occasion[];
  verses?: string;
};

export type Tune = {
  _id: string;
  _type: "tune";
  title: string;
  musicCopyright: Copyright;
  file: Asset;
  composer: Author;
  metre: Metre;
};

export type Prayer = {
  _id: string;
  _type: "prayer";
  author?: Author;
  content: BlockContent[];
  title?: string;
  copyright?: Copyright;
  keywords?: Keyword[];
};

export type Scripture = {
  _id: string;
  _type: "scripture";
  title?: string;
  content: BlockContent[];
  translation?: string;
  occasions?: Occasion[];
  keywords?: Keyword[];
};

export type ExternalUrl = {
  _id: string;
  _type: "externalUrl";
  title: string;
  url: string;
  blank?: boolean;
}

export type ChildPageReference =
  | PageContent
  | RestrictedContent
  | Hymn
  | Prayer
  | Liturgy
  | Scripture
  | Asset
  | ExternalUrl;

export type ChildPage = {
  _id: string;
  childPage: ChildPageReference;
  alternateText: string;
};

export type MenuItem = {
  _key: string;
  text: string;
  childpages?: ChildPage[];
};

export type SearchResult = Hymn | Prayer | Liturgy | Scripture;

export type Main = Record<string, unknown>;

export type BlockContent = {
  style: string;
  children: any[];
};

export type Metre = {
  _id: string;
  _type?: "metre";
  metre?: string;
  tunes?: Tune[];
};

export type PageContent = {
  _id: string;
  _type: "pageContent";
  content?: BlockContent[];
  hasToc?: boolean;
  slug: string;
  subtitle?: string;
  title?: string;
};

export type RestrictedContent = {
  _id: string;
  _type: "restrictedContent";
  content?: BlockContent[];
  hasToc?: boolean;
  slug: string;
  subtitle?: string;
  title?: string;
};

export type Copyright = {
  _id: string;
  name: string;
};

export type ShortList = Hymn | Prayer | Scripture | Liturgy;

export type Occasion = {
  _id: string;
  _type: "occasion";
};

export type OccasionGroupedById = {
  _id: string;
  name?: string;
  values?: Occasion[];
};

export type SearchInput = {
  book?: string;
  tune?: string;
  keyword?: string;
  occasion?: string;
  textContains?: string;
  _operators?: {
    metre?: {
      in?: string;
    };
  };
};

export type FilterInput = {
  id?: string;
  slug?: string;
  search?: string;
  textContains?: string;
};

export enum TuneSortBy {
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

type Name = {
  first?: string;
  last?: string;
};

export enum InvoiceStatus {
  Draft = "draft",
  Open = "open",
  Paid = "paid",
  Uncollectible = "uncollectible",
  Void = "void",
}

export type PresentationOptions = {
  background?: string;
  font?: string;
  ratio?: string;
};

export type User = {
  _id: string;
  auth0Id?: string;
  name?: Name;
  email?: string;
  hasPaidAccount?: boolean;
  hasFreeAccount?: boolean;
  picture?: string;
  shortlist?: ShortList[];
  role?: string;
  periodEndDate?: Date;
  invoiceStatus?: InvoiceStatus;
  stripeCustomerId?: string;
  presentationOptions?: PresentationOptions;
};

export type StripeCheckoutSession = {
  sessionId?: string;
};

export type StripeSubscription = {
  id: string;
  cancelAt?: Date;
  canceledAt?: Date;
  currentPeriodEnd?: Date;
  plan?: string;
  startDate?: Date;
  status?: string;
};
