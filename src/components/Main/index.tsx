import { getArtists, getRecommendations, getTopTracks } from '@/api/spotify';
import TopTrack from '@/components/Main/TopTrack';
import { useEffect, useMemo, useState } from 'react';
import Artists from '../common/Artist';
import Recommendations from './Recommendations';

export default function Main() {
  const [topTracks, setTopTracks] = useState<Tracks | null>(null);
  const [recommendations, setRecommendations] =
    useState<Recommendations | null>(null);
  const [artists, setArtists] = useState<Artist[] | null>(null);

  useEffect(() => {
    getTopTracks()?.then(v => setTopTracks(v));
    getRecommendations()?.then(v => setRecommendations(v));
  }, []);

  useMemo(() => {
    if (topTracks && 'items' in topTracks) {
      const artistIds = topTracks.items
        .map(v => v.artists.map(artist => artist.id))
        .flat();
      getArtists(artistIds).then(artists => setArtists(artists));
    }
  }, [topTracks]);

  return (
    <>
      <div>
        <h1>top tracks</h1>
        <TopTrack topTracks={topTracks} />
        <h2>top track artists</h2>
        <Artists artists={artists} />
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
