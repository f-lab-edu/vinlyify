import { MetaInfo } from '@/models';

export interface Profile extends MetaInfo {
  followers?: { href?: null | string; total: number };
}
export interface Artist extends Profile {
  genres?: string[];
  popularity?: number;
}

export interface UserProfile extends Profile {
  country?: string;
  display_name: string;
  email?: string;
  explicit_content?: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  product?: string;
}
