import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { Album } from '@/models/Album';
import { useEffect, useState } from 'react';
import Card from '../_shared/Card';
import CoverImage from '../_shared/CoverImage';
import MultiProfile from '../_shared/MutliProfile';
import { useMultiProfileImg } from '../_shared/MutliProfile/hooks/useMultiProfileImg';
import Profile from '../_shared/MutliProfile/Profile';

const AlbumItem = ({
  item,
  artistImgUrls,
}: {
  item: Album;
  artistImgUrls: Map<string, string>;
}) => {
  const artistInfo = useMultiProfileImg({ item, artistImgUrls });
  const [validArtistInfo, setValidArtistInfo] = useState(() =>
    artistInfo?.every(item => item.img !== undefined),
  );

  useEffect(() => {
    setValidArtistInfo(artistInfo?.every(item => item.img !== undefined));
  }, [artistInfo]);

  return (
    <Card
      title={item?.name}
      contextUri={item?.uri}
      title_tag={[item?.album_type, item?.release_date].join(' ')}
      topContent={
        item?.images ? (
          <CoverImage
            imgUrl={
              item?.images === undefined
                ? PLACEHOLDER_IMAGE
                : item?.images[0]?.url
            }
            url={item?.external_urls?.spotify}
          />
        ) : (
          <CoverImage.Skeleton />
        )
      }
      isPlayable={item?.is_playable}
    >
      {validArtistInfo ? (
        <MultiProfile artist={artistInfo} />
      ) : (
        <Profile.Skeleton />
      )}
    </Card>
  );
};

export default AlbumItem;
