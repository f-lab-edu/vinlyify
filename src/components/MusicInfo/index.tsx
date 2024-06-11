import { PLACEHOLDER_IMAGE } from '@/constants';
import { useCurrentPlayingTrack } from '@/hooks/query/useCurrentPlayingTrack';
import ArtistInfo from './ArtistInfo';
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

      <ArtistInfo artists={data.item.artists} />
      {/* <div>{JSON.stringify(data)}</div> */}
    </>
  );
}
