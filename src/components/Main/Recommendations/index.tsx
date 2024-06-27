import { useRecommendations } from '@/hooks/query/useRecommendations';
import AnimatedTitle from '../_shared/AnimatedTitle';
import Table from './Table';

export default function Recommendations() {
  const { data } = useRecommendations();

  if (data?.tracks == null) {
    return null;
  }
  return (
    <>
      <AnimatedTitle>Recommendations</AnimatedTitle>
      <Table items={data.tracks} />
    </>
  );
}
