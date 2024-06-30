import { Album } from '@/models/Album';
import { Pagination } from '@/models/Pagination';
import { useMultiProfileMap } from '../_shared/MutliProfile/hooks/useMultiProfileMap';
import AlbumList from './AlbumList';

const AlbumTab = ({
  tabItem,
  currentTabPagingInfo,
}: {
  tabItem: Album[];
  currentTabPagingInfo: Pagination | null;
}) => {
  const artistImgs = useMultiProfileMap({ tabItem });
  return (
    <>
      <AlbumList tabItem={tabItem} artistImgUrls={artistImgs} />
      <div>{JSON.stringify(currentTabPagingInfo)}</div>
    </>
  );
};

export default AlbumTab;
