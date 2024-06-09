import { playTrack } from '@/api/spotify';
import { PLACEHOLDER_IMAGE } from '@/constants';
import { Album } from '@/models/Album';
import { useEffect, useState } from 'react';
import Card from '../_shared/Card';
import { useMultiProfileImg } from '../_shared/hooks/useMultiProfileImg';
import Logo from '../_shared/Logo';
import MultiProfile from '../_shared/MultiProfile';
import LoadingProfile from '../_shared/MultiProfile/LoadingImage';
import PlayButton from '../_shared/PlayButton';
import ProfileImage from '../_shared/ProfileImage';
import ProfileSkeleton from '../_shared/Skeletons/ProfileSkeleton';

const AlbumItem = ({
  item,
  artistImgUrls,
}: {
  item: Album;
  artistImgUrls: Map<string, string>;
}) => {
  const onPlayCurrentAlbum = () => playTrack({ context_uris: item?.uri });
  const artistInfo = useMultiProfileImg({ item, artistImgUrls });
  const [validArtistInfo, setValidArtistInfo] = useState(() =>
    artistInfo?.every(item => item.img !== undefined),
  );

  useEffect(() => {
    if (artistInfo?.every(item => item.img !== undefined)) {
      setValidArtistInfo(true);
    } else {
      setValidArtistInfo(false);
    }
  }, [artistInfo]);

  return (
    <Card
      title={item?.name}
      title_tag={[item?.album_type, item?.release_date].join(' ')}
      left={
        item?.images ? (
          <ProfileImage
            imgUrl={
              item?.images === undefined
                ? PLACEHOLDER_IMAGE
                : item?.images[0]?.url
            }
            link={<Logo url={item?.external_urls?.spotify ?? ''} />}
          />
        ) : (
          <ProfileSkeleton />
        )
      }
      playButton={
        item.is_playable ? (
          <PlayButton onPlayCurrent={onPlayCurrentAlbum} />
        ) : (
          <></>
        )
      }
    >
      {validArtistInfo ? (
        <MultiProfile artist={artistInfo} />
      ) : (
        <LoadingProfile />
      )}
    </Card>
  );
};

export default AlbumItem;
