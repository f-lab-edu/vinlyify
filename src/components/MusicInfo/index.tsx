import { PLACEHOLDER_IMAGE } from '@/constants';
import { useCurrentPlayingTrack } from '@/hooks/query/useCurrentPlayingTrack';
import Lyrics from './Lyrics';
import ProgressBar from './ProgressBar';
import Vinyl from './Vinyl';

export default function MusicInfo() {
  const { data } = useCurrentPlayingTrack();

  return !data?.item ? (
    <>nothing to show...</>
  ) : (
    <>
      {/* <h1>
        {data.item.name}, current progress: {data?.progress_ms}
      </h1> */}
      <Vinyl
        imgUrl={
          data.item?.album?.images[0].url
            ? data.item?.album?.images[0].url
            : PLACEHOLDER_IMAGE
        }
      />

      <ProgressBar
        progress={data?.progress_ms ?? 0}
        duration={data?.item?.duration_ms}
      />
      <Lyrics term={data?.item?.name} artist={data?.item?.artists[0].name} />
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
