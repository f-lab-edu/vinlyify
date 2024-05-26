import { RecommendedTracks } from '@/models/track';

export default function Recommendations({
  recommendations,
}: {
  recommendations: RecommendedTracks | null;
}) {
  return <>{JSON.stringify(recommendations)}</>;
}
