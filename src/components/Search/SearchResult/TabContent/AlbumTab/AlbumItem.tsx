import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { Album } from '@/models/Album';
import { useEffect, useState } from 'react';
/**
 * !!TODO 모든 Tab 컴포넌트 PR 머지 후 SearchResult/TabContent/index.tsx에 변경 사항 반영되면 삭제하기
 * 모든 탭 완성 후 탭 프롭스 인터페이스가
 * export interface TabProps {
 * innerRef?: (node?: Element | null) => void | null;
 * }
 * 사용처인 SearchResult/TabContent/index.tsx에 추가될 예정입니다.
 */
import { TabProps } from '..';
import Card from '../_shared/Card';
import CoverImage from '../_shared/CoverImage';
import MultiProfile from '../_shared/MutliProfile';
import { useMultiProfileImg } from '../_shared/MutliProfile/hooks/useMultiProfileImg';
import Profile from '../_shared/MutliProfile/Profile';

interface AlbumItemProps extends TabProps {
  item: Album;
  artistImgUrls: Map<string, string>;
}

const AlbumItem = ({ item, artistImgUrls, innerRef }: AlbumItemProps) => {
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
      innerRef={innerRef}
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
