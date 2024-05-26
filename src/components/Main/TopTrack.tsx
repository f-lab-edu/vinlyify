import { getTopTracks } from '@/api/spotify';
import { Tracks } from '@/models/track';
import { useEffect, useState } from 'react';

export default function TopTrack() {
  const [topTracks, setTopTracks] = useState<Tracks | null>(null);
  useEffect(() => {
    getTopTracks()?.then(v => setTopTracks(v));
  }, []);
  return <>{JSON.stringify(topTracks)}</>;
}
