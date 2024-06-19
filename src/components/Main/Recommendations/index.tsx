import { useRecommendations } from '@/hooks/query/useRecommendations';
import AnimatedTitle from '../_shared/AnimatedTitle';
import Table from './Table';

export default function Recommendations() {
  const { data } = useRecommendations();

  return (
    <>
      <AnimatedTitle>Recommendations</AnimatedTitle>
      <Table items={data?.tracks} />
    </>
  );
}
