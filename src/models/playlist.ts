import { MetaInfo } from '@/models/MetaInfo';
import { UserProfile } from '@/models/Profile';

export interface Playlist extends MetaInfo {
  collaborative: boolean;
  description: string;
  owner: UserProfile;
  primary_color?: null | string;
  public?: null | string;
  snapshot_id: string;
  tracks: { href: string; total: number };
}
