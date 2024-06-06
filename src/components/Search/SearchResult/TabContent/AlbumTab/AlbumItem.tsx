import { playTrack } from '@/api/spotify';
import { PLACEHOLDER_IMAGE } from '@/constants';
import { Album } from '@/models/Album';
import { useMemo } from 'react';
import Card from '../_shared/Card';
import Logo from '../_shared/Logo';
import MultiProfile from '../_shared/MultiProfile';
import PlayButton from '../_shared/PlayButton';
import ProfileImage from '../_shared/ProfileImage';
import { useMultiProfileImg } from '../_shared/hooks/useMultiProfileImg';

const AlbumItem = ({
  item,
  artistImgUrls,
}: {
  item: Album;
  artistImgUrls: Map<string, string>;
}) => {
  const onPlayCurrentAlbum = () => playTrack({ context_uris: item?.uri });
  const validImageUrl = useMemo(() => {
    if (item?.images === undefined) {
      return PLACEHOLDER_IMAGE;
    }
    return item?.images[0]?.url;
  }, [item]);

  const artistInfo = useMultiProfileImg({ item, artistImgUrls });

  return (
    <Card
      title={item?.name}
      title_tag={[item?.album_type, item?.release_date].join(' ')}
      left={
        <ProfileImage
          imgUrl={validImageUrl}
          link={<Logo url={item?.external_urls?.spotify || ''} />}
        />
      }
      playButton={
        item.is_playable ? (
          <PlayButton onPlayCurrent={onPlayCurrentAlbum} />
        ) : (
          <></>
        )
      }
    >
      <MultiProfile artist={artistInfo} />
    </Card>
  );
};

export default AlbumItem;
