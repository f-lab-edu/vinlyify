import { Album } from '@/models/Album';
import { Pagination } from '@/models/Pagination';
import { useMultiProfileMap } from '../_shared/MutliProfile/hooks/useMultiProfileMap';
import Paging from '../_shared/Paging';
import AlbumList from './AlbumList';

const AlbumTab = ({
  tabItem,
  currentTabPagingInfo,
}: {
  tabItem: Album[];
  currentTabPagingInfo: Pagination;
}) => {
  const artistImgs = useMultiProfileMap({ tabItem });
  return (
    <>
      <AlbumList tabItem={tabItem} artistImgUrls={artistImgs} />
      <Paging currentTabPagingInfo={currentTabPagingInfo} />
    </>
  );
};

export default AlbumTab;
