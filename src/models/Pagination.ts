export interface Pagination {
  href: string;
  limit: number;
  next?: string;
  offset: number;
  previous?: string | null;
  total: number;
}
