import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { Track } from '@/models/Track';
import { HHMMSSFormat } from '@/utils/time';
import { useEffect, useMemo, useState } from 'react';
/**
 * !!TODO 모든 Tab 컴포넌트 PR 머지 후 SearchResult/TabContent/index.tsx에 변경 사항 반영되면 주석 삭제하기
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

interface TrackItemProps extends TabProps {
  item: Track;
  artistImgUrls: Map<string, string>;
}

const TrackItem = ({ item, artistImgUrls, innerRef }: TrackItemProps) => {
  const artistInfo = useMultiProfileImg({ item, artistImgUrls });
  const [validTrackArtistInfo, setValidTrackArtistInfo] = useState(() =>
    artistInfo?.every(item => item.img !== undefined),
  );

  useEffect(() => {
    setValidTrackArtistInfo(artistInfo?.every(item => item.img !== undefined));
  }, [artistInfo]);

  const trackDurationHHMMSS = useMemo(
    () => HHMMSSFormat({ utcTime: item.duration_ms }),
    [item],
  );

  return (
    <Card
      title={item?.name}
      contextUri={item?.uri}
      innerRef={innerRef}
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
          <CoverImage.Skeleton />
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
