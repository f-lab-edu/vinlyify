import TopTrack from '@/components/Main/TopTrack';
import Recommendations from './Recommendations';

export default function Main() {
  return (
    <>
      <TopTrack />
      <Recommendations />
    </>
  );
}

export function Loading() {
  return <h2>🌀 Loading...</h2>;
}
