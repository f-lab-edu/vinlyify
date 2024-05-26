export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface External_Urls {
  spotify: string;
  href?: string;
  id?: string;
}

export interface Pagination {
  href: string;
  limit: number;
  next?: string;
  offset: number;
  previous?: string | null;
  total: number;
}

export interface MetaInfo {
  uri: string;
  id: string;
  images?: Image[];
  href?: string;
  name?: string;
  type?: string;
  external_urls?: External_Urls;
}
