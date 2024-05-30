import { useCurrentPlayingTrack } from '@/query/useCurrentPlayingTrack';

export default function MusicInfo() {
  const { data } = useCurrentPlayingTrack();

  return !data?.item ? (
    <>nothing to show...</>
  ) : (
    <>
      <h1>
        {data.item.name}, current progress: {data?.progress_ms}
      </h1>

      <div>{JSON.stringify(data)}</div>
    </>
  );
}
