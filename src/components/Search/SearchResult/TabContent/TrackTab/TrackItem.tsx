import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { Track } from '@/models/Track';
import { UTC2HHMMSS } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import Card from '../_shared/Card';
import CoverImage from '../_shared/CoverImage';
import CoverImageSkeleton from '../_shared/CoverImage/CoverImageSkeleton';
import MultiProfile from '../_shared/MutliProfile';
import { useMultiProfileImg } from '../_shared/MutliProfile/hooks/useMultiProfileImg';
import Profile from '../_shared/MutliProfile/Profile';

const TrackItem = ({
  item,
  artistImgUrls,
}: {
  item: Track;
  artistImgUrls: Map<string, string>;
}) => {
  const artistInfo = useMultiProfileImg({ item, artistImgUrls });
  const [validTrackArtistInfo, setValidTrackArtistInfo] = useState(() =>
    artistInfo?.every(item => item.img !== undefined),
  );

  useEffect(() => {
    setValidTrackArtistInfo(artistInfo?.every(item => item.img !== undefined));
  }, [artistInfo]);

  const trackDurationHHMMSS = useMemo(
    () => UTC2HHMMSS({ duration_ms: item.duration_ms }),
    [item],
  );

  return (
    <Card
      title={item?.name}
      contextUri={item?.uri}
      title_tag={`${item?.album?.name} #${item?.track_number}`}
      topContent={
        item?.album?.images ? (
          <CoverImage
            imgUrl={
              item?.album?.images === undefined
                ? PLACEHOLDER_IMAGE
                : item?.album?.images[0]?.url
            }
            url={item?.external_urls?.spotify}
          />
        ) : (
          <CoverImageSkeleton />
        )
      }
      isPlayable={item?.is_playable}
    >
      <li>재생 시간: {trackDurationHHMMSS}</li>
      {validTrackArtistInfo ? (
        <MultiProfile artist={artistInfo} />
      ) : (
        <Profile.Skeleton />
      )}
    </Card>
  );
};

export default TrackItem;
