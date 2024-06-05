import { PLACEHOLDER_IMAGE } from '@/constants';
import { Artist } from '@/models/Profile';
import { useMemo } from 'react';
import Card from '../_shared/Card';
import Logo from '../_shared/Logo';
import ProfileImage from '../_shared/ProfileImage';
import GenreList from './GenreList';

const ArtistInfo = ({ item }: { item: Artist }) => {
  const compactFollowerCount = useMemo(() => {
    if (item?.followers?.total) {
      return new Intl.NumberFormat('ko-KR', {
        notation: 'compact',
        compactDisplay: 'short',
      }).format(item?.followers.total);
    } else {
      return null;
    }
  }, [item]);
  return (
    <Card
      title={item?.name}
      title_tag={`followers : ${compactFollowerCount}`}
      left={
        <ProfileImage
          imgUrl={
            item?.images === undefined
              ? PLACEHOLDER_IMAGE
              : item?.images[0]?.url
          }
          link={<Logo url={item?.external_urls?.spotify ?? ''} />}
        />
      }
    >
      {/* <Link to={item?.href ?? ''}>link to artist api</Link> */}
      {/* <>artist id: {item?.id}</> */}
      {/* <div>artist popularity: {item?.popularity}</div> */}
      {/* {item?.genres ?? (
        <>
          genres: {item?.genres?.map(genre => <span key={genre}>{genre}</span>)}
        </>
      )} */}
      {item?.genres && item.genres?.length > 0 ? (
        <GenreList genres={item?.genres} />
      ) : null}

      {/* <div>artist uri: {item?.uri}</div> */}
    </Card>
  );
};

export default ArtistInfo;
