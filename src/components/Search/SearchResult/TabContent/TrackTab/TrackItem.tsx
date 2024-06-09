import { playTrack } from '@/api/spotify';
import { PLACEHOLDER_IMAGE } from '@/constants';
import { Track } from '@/models/Track';
import Card from '../_shared/Card';
import { useMultiProfileImg } from '../_shared/hooks/useMultiProfileImg';
import Logo from '../_shared/Logo';
import MultiProfile from '../_shared/MultiProfile';
import PlayButton from '../_shared/PlayButton';
import ProfileImage from '../_shared/ProfileImage';
import ProfileSkeleton from '../_shared/Skeletons/ProfileSkeleton';

const TrackItem = ({
  item,
  artistImgUrls,
}: {
  item: Track;
  artistImgUrls: Map<string, string>;
}) => {
  const onPlayCurrentAlbum = () =>
    playTrack({ context_uris: item?.album?.uri, offset: { uri: item?.uri } });

  const artistInfo = useMultiProfileImg({ item, artistImgUrls });

  /**
   * 밀리초로 되어 있는 트랙 재생 시간을 HH:MM:SS 형식으로 변환
   */
  const trackDurationToHHMMSS = (() => {
    const time = new Date(item.duration_ms);
    return [
      `${time.getUTCHours()}`.padStart(2, '0'),
      `${time.getUTCMinutes()}`.padStart(2, '0'),
      `${time.getUTCSeconds()}`.padStart(2, '0'),
    ].join(':');
  })();

  return (
    <Card
      title={item?.name}
      title_tag={`${item?.album?.name} #${item?.track_number}`}
      left={
        item?.album?.images ? (
          <ProfileImage
            imgUrl={
              item?.album?.images === undefined
                ? PLACEHOLDER_IMAGE
                : item?.album?.images[0]?.url
            }
            link={<Logo url={item?.external_urls?.spotify ?? ''} />}
          />
        ) : (
          <ProfileSkeleton />
        )
      }
      playButton={<PlayButton onPlayCurrent={onPlayCurrentAlbum} />}
    >
      <li>재생 시간: {trackDurationToHHMMSS}</li>
      <MultiProfile artist={artistInfo} />
    </Card>
  );
};

export default TrackItem;
