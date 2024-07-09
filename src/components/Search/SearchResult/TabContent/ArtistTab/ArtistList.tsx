import { Artist } from '@/models/Profile';
/**
 * !!TODO 모든 Tab 컴포넌트 PR 머지 후 SearchResult/TabContent/index.tsx에 변경 사항 반영되면 삭제하기
 * 모든 탭 완성 후 탭 프롭스 인터페이스가
 * export interface TabProps {
 * innerRef?: (node?: Element | null) => void | null;
 * }
 * 사용처인 SearchResult/TabContent/index.tsx에 추가될 예정입니다.
 */
import { TabProps } from '..';
import ArtistItem from './ArtistItem';

interface ArtistListProps extends TabProps {
  tabItem: Artist[];
}

const ArtistList = ({ tabItem, innerRef }: ArtistListProps) => {
  return tabItem.map((item, index) =>
    index === tabItem.length - 1 ? (
      <ArtistItem item={item} key={item.id} innerRef={innerRef} />
    ) : (
      <ArtistItem item={item} key={item.id} />
    ),
  );
};

export default ArtistList;
