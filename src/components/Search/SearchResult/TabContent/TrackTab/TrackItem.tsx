import { Loading } from '@/components/Main';
import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { Track } from '@/models/Track';
import { useEffect, useState } from 'react';
import Card from '../_shared/Card';
import CoverImage from '../_shared/CoverImage';
import CoverImageSkeleton from '../_shared/CoverImage/CoverImageSkeleton';
import MultiProfile from '../_shared/MutliProfile';
import { useMultiProfileImg } from '../_shared/MutliProfile/hooks/useMultiProfileImg';

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
    if (artistInfo?.every(item => item.img !== undefined)) {
      setValidTrackArtistInfo(true);
    } else {
      setValidTrackArtistInfo(false);
    }
  }, [artistInfo]);

  /**
   * 밀리초로 되어 있는 트랙 재생 시간을 HH:MM:SS 형식으로 변환
   */
  const trackDurationToHHMMSS = (() => {
    const time = new Date(item.duration_ms);
    const MMSS = [
      `${time.getUTCMinutes()}`.padStart(2, '0'),
      `${time.getUTCSeconds()}`.padStart(2, '0'),
    ];
    return time.getUTCHours() > 0
      ? [`${time.getUTCHours()}`.padStart(2, '0'), ...MMSS].join(':')
      : MMSS.join(':');
  })();

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
      <li>재생 시간: {trackDurationToHHMMSS}</li>
      {validTrackArtistInfo ? (
        <MultiProfile artist={artistInfo} />
      ) : (
        //!!<Profile.Skeleton /> pr 머지되면 변경해주기
        <Loading />
      )}
    </Card>
  );
};

export default TrackItem;
