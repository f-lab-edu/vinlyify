import Layout from './Layout';
import Recommendations from './Recommendations';
import TopTrack from './TopTrack';

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
