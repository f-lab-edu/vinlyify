import { Album } from '@/models/Album';
import { Pagination } from '@/models/Pagination';

const AlbumTab = ({
  tabItem,
  currentTabPagingInfo,
}: {
  tabItem: Album[];
  currentTabPagingInfo: Pagination | null;
}) => {
  return (
    <>
      <div>{JSON.stringify(currentTabPagingInfo)}</div>
      {JSON.stringify(tabItem)}
    </>
  );
};

export default AlbumTab;
