import { Track } from './track';

export interface Seed {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  initialPoolSize: number;
  type: string;
}

export interface Recommendations {
  tracks: Track[];
  seeds: Seed[];
}
