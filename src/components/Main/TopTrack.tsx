import { getTopTracks } from '@/api/spotify';
import { Tracks } from '@/models/track';
import { useEffect, useState } from 'react';

export default function TopTrack() {
  const [topTracks, setTopTracks] = useState<Tracks | null>(null);
  useEffect(() => {
    getTopTracks()?.then(v => setTopTracks(v));
  }, []);
  return (
    <>
      <h1>top tracks</h1>
      {JSON.stringify(topTracks)}
    </>
  );
}
