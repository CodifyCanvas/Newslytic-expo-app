export interface NewsArticle {
  id: string;
  sectionName: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  fields?: {
    trailText?: string;
    bodyText?: string;
    thumbnail?: string;
  };
}

export interface Edition {
  id: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  code: string;
}

export interface NewsSection {
  id: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  editions: Edition[];
}

export interface BookmarkArticle {
  id: string;
  webTitle: string;
  sectionName: string;
  webPublicationDate: string;
  webUrl: string;
  fields?: {
    thumbnail?: string
  },
}