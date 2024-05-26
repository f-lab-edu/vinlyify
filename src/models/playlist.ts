import { External_Urls, MetaInfo } from '@/models';
import { UserProfile } from './profile';

export interface Playlist extends MetaInfo {
  collaborative: boolean;
  description: string;
  external_urls: Pick<External_Urls, 'spotify'>;
  owner: UserProfile;
  primary_color?: null | string;
  public?: null | string;
  snapshot_id: string;
  tracks: { href: string; total: number };
}
