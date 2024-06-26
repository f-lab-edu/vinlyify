import Layout from '@/components/_shared/Layout';
import { useTopTracks } from '@/hooks/query/useTopTracks';
import AnimatedTitle from '../_shared/AnimatedTitle';
import Carousel from './Carousel';

export default function TopTrack() {
  const { data, isLoading } = useTopTracks(20);

  if (isLoading) return <>loading..</>;
  else if (data?.items == null) return null;

  return (
    <Layout>
      <AnimatedTitle>My top 20</AnimatedTitle>
      <Carousel items={data.items} />
    </Layout>
  );
}
