import { useRecommendations } from '@/hooks/query/useRecommendations';
import AnimatedTitle from '../_shared/AnimatedTitle';
import Table from './Table';

export default function Recommendations() {
  const { data, isLoading } = useRecommendations();

  if (isLoading) {
    return (
      <>
        <AnimatedTitle>Recommendations</AnimatedTitle>
        return <Table.Skeleton />
      </>
    );
  }
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
