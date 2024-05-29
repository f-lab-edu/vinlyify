import { useRecommendations } from '@/query';

export default function Recommendations() {
  const { data } = useRecommendations();

  return (
    <>
      <h1>recommendations</h1> {JSON.stringify(data)}
    </>
  );
}
