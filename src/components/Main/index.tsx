import TopTrack from '@/components/Main/TopTrack';
import Layout from './Layout';
import Recommendations from './Recommendations';

export default function Main() {
  return (
    <Layout>
      <TopTrack />
      <Recommendations />
    </Layout>
  );
}

export function Loading() {
  return <h2>🌀 Loading...</h2>;
}
