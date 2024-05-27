import TopTrack from '@/components/Main/TopTrack';
import Recommendation from './Recommendations';

export default function Main() {
  return (
    <>
      <TopTrack />
      <Recommendation />
    </>
  );
}

export function Loading() {
  return <h2>🌀 Loading...</h2>;
}
