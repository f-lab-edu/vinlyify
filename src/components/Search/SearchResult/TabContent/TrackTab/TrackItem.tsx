import { playTrack } from '@/api/spotify';
import { PLACEHOLDER_IMAGE } from '@/constants';
import { Track } from '@/models/Track';
import { useMemo } from 'react';
import Card from '../_shared/Card';
import Logo from '../_shared/Logo';
import MultiProfile from '../_shared/MultiProfile';
import PlayButton from '../_shared/PlayButton';
import ProfileImage from '../_shared/ProfileImage';
import { useMultiProfileImg } from '../_shared/hooks/useMultiProfileImg';

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

  const trackDuration = useMemo(() => {
    const time = new Date(item.duration_ms);
    return [
      `${time.getUTCHours()}`.padStart(2, '0'),
      `${time.getUTCMinutes()}`.padStart(2, '0'),
      `${time.getUTCSeconds()}`.padStart(2, '0'),
    ].join(':');
  }, [item]);

  return (
    <Card
      title={item?.name}
      title_tag={`${item?.album?.name} #${item?.track_number}`}
      left={
        <ProfileImage
          imgUrl={
            item?.album?.images === undefined
              ? PLACEHOLDER_IMAGE
              : item?.album?.images[0]?.url
          }
          link={<Logo url={item?.external_urls?.spotify ?? ''} />}
        />
      }
      playButton={<PlayButton onPlayCurrent={onPlayCurrentAlbum} />}
    >
      <li>재생 시간: {trackDuration}</li>
      <MultiProfile artist={artistInfo} />
    </Card>
  );
};

export default TrackItem;
