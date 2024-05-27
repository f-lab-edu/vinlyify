import { getRecommendations } from '@/api/spotify';
import { RecommendedTracks } from '@/models/track';
import { useEffect, useState } from 'react';

export default function Recommendations() {
  const [recommendations, setRecommendations] =
    useState<RecommendedTracks | null>(null);
  useEffect(() => {
    getRecommendations().then(v => {
      console.log(v);
      setRecommendations(v);
    });
  }, []);
  if (recommendations == null) return <>nothing to show</>;
  return (
    <>
      <h1>recommendations</h1> {JSON.stringify(recommendations)}
    </>
  );
}
