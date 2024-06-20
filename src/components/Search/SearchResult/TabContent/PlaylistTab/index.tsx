import { Pagination } from '@/models/Pagination';
import { Playlist } from '@/models/Playlist';

const PlaylistTab = ({
  tabItem,
  currentTabPagingInfo,
}: {
  tabItem: Playlist[];
  currentTabPagingInfo: Pagination | null;
}) => {
  return (
    <>
      <div>{JSON.stringify(currentTabPagingInfo)}</div>
      {JSON.stringify(tabItem)}
    </>
  );
};

export default PlaylistTab;
