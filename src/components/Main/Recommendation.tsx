import { Recommendations } from '@/models/recommendation';

export default function Recommendation({
  recommendations,
}: {
  recommendations: Recommendations | null;
}) {
  return <>{JSON.stringify(recommendations)}</>;
}
