import { Album } from '@/models/Album';
import { useEffect, useState } from 'react';
import Card from '../_shared/Card';
import MultiProfile from '../_shared/MutliProfile';
import { useMultiProfileImg } from '../_shared/MutliProfile/hooks/useMultiProfileImg';
import { useMultiProfileMap } from '../_shared/MutliProfile/hooks/useMultiProfileMap';
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
      title={item.name}
      contextUri={item.uri}
      titleTag={[item.album_type, item.release_date].join(' ')}
      coverImage={item?.images?.[0]?.url}
      isPlayable={item.is_playable}
      externalUrls={item.external_urls?.spotify}
    >
      {validArtistInfo ? (
        <MultiProfile artist={artistInfo} />
      ) : (
        <Profile.Skeleton />
      )}
    </Card>
  );
};

const AlbumTab = ({ tabItem }: { tabItem: Album[] }) => {
  const artistImgs = useMultiProfileMap({ tabItem });
  return tabItem?.map((item, index) => (
    <AlbumItem item={item} key={item.id + index} artistImgUrls={artistImgs} />
  ));
};

export default AlbumTab;
