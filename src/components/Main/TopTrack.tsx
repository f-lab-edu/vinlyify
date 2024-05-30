import { useTopTracks } from '@/query/useTopTracks';

export default function TopTrack() {
  const { data } = useTopTracks();

  return (
    <>
      <h1>top tracks</h1>
      {JSON.stringify(data)}
    </>
  );
}
