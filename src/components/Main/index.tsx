import TopTrack from '@/components/Main/TopTrack';
import Recommendation from './Recommendations';

export default function Main() {
  return (
    <>
      <div>
        <h1>top tracks</h1>
        <TopTrack />
      </div>
      <div>
        <h2>top track artists</h2>
      </div>
      <div>
        <h1>recommendations</h1>
        <Recommendation />
      </div>
    </>
  );
}

export function Loading() {
  return <h2>🌀 Loading...</h2>;
}
