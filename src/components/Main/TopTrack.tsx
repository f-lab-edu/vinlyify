import { Tracks } from '@/models/track';

export default function TopTrack({ topTracks }: { topTracks: Tracks | null }) {
  return <>{JSON.stringify(topTracks)}</>;
}
