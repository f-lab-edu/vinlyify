import { getRecommendations, getTopTracks } from '@/api/spotify';
import TopTrack from '@/components/Main/TopTrack';
import { useEffect, useState } from 'react';
import Recommendations from './Recommendations';

export default function Main() {
  const [topTracks, setTopTracks] = useState<Tracks | null>(null);
  const [recommendations, setRecommendations] =
    useState<Recommendations | null>(null);

  useEffect(() => {
    getTopTracks()?.then(v => setTopTracks(v));
    getRecommendations()?.then(v => setRecommendations(v));
  }, []);

  return (
    <>
      <div>
        <h1>top tracks</h1>
        <TopTrack topTracks={topTracks} />
      </div>
      <div>
        <h1>recommendations</h1>
        <Recommendations recommendations={recommendations} />
      </div>
    </>
  );
}

export function Loading() {
  return <h2>🌀 Loading...</h2>;
}
