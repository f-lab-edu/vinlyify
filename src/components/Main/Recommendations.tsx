import { getRecommendations } from '@/api/spotify';
import { RecommendedTracks } from '@/models/track';
import { useEffect, useState } from 'react';

export default function Recommendations() {
  const [recommendations, setRecommendations] =
    useState<RecommendedTracks | null>(null);
  useEffect(() => {
    getRecommendations()?.then(v => setRecommendations(v));
  }, []);

  return <>{JSON.stringify(recommendations)}</>;
}
