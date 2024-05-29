import { getTopTracks } from '@/api/spotify';
import { TrackSearchResult } from '@/models/searchResult';
import { useEffect, useState } from 'react';

export default function TopTrack() {
  const [topTracks, setTopTracks] = useState<TrackSearchResult['items'] | null>(
    null,
  );
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
