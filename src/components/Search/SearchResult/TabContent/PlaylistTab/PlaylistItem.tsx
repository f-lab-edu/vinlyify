import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { Playlist } from '@/models/Playlist';
import classNames from 'classnames/bind';
import Card from '../_shared/Card';
import CoverImage from '../_shared/CoverImage';
/**
 * !!TODO 모든 Tab 컴포넌트 PR 머지 후 SearchResult/TabContent/index.tsx에 변경 사항 반영되면 삭제하기
 * 모든 탭 완성 후 탭 프롭스 인터페이스가
 * export interface TabProps {
 * innerRef?: (node?: Element | null) => void | null;
 * }
 * 사용처인 SearchResult/TabContent/index.tsx에 추가될 예정입니다.
 */
import { TabProps } from '..';
import Style from './playlist-item.module.scss';

const style = classNames.bind(Style);

interface PlaylistItemProps extends TabProps {
  item: Playlist;
}

const PlaylistItem = ({ item, innerRef }: PlaylistItemProps) => {
  return (
    <Card
      title={item?.name}
      innerRef={innerRef}
      title_tag={`by. ${item?.owner?.display_name}`}
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
      contextUri={item?.uri}
      isPlayable={true}
    >
      <li>total tracks : {item?.tracks?.total}</li>

      <li className={style('playlist-description')}>
        <div dangerouslySetInnerHTML={{ __html: item?.description }} />
      </li>
    </Card>
  );
};

export default PlaylistItem;
