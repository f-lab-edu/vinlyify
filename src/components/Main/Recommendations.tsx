import { TrackSearchResult } from '@/models/spotify';
import { useRecommendations, useTopTracks } from '@/query';
import { useEffect } from 'react';

export default function Recommendations() {
  const { data, isFetched } = useTopTracks();
  const { refetch } = useRecommendations(data as TrackSearchResult);

  useEffect(() => {
    if (isFetched) refetch();
  }, [isFetched, refetch]);

  return (
    <>
      <h1>recommendations</h1> {JSON.stringify(data)}
    </>
  );
}
