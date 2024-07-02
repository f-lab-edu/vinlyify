import Recommendations from '@/components/Main/Recommendations';
import TopTrack from '@/components/Main/TopTrack';

import Recommendations from './Recommendations';
import Layout from '../_shared/Layout';


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
