// import Paging from '../_shared/Paging';
import { Album } from '@/models/Album';
import { useMultiProfileMap } from '../_shared/hooks/useMultiProfileMap';
import AlbumList from './AlbumList';

const AlbumTab = ({
  tabItem,
  // pagingInfo,
}: {
  tabItem: Album[];
  // pagingInfo: Pagination;
}) => {
  const artistImgs = useMultiProfileMap({ tabItem });
  return (
    <>
      {/* <Paging pagingInfo={pagingInfo} /> */}
      <AlbumList tabItem={tabItem} artistImgUrls={artistImgs} />
    </>
  );
};

export default AlbumTab;
