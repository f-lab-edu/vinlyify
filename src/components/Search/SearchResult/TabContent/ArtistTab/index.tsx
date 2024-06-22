import { Pagination } from '@/models/Pagination';
import { Artist } from '@/models/Profile';

const ArtistTab = ({
  tabItem,
  currentTabPagingInfo,
}: {
  tabItem: Artist[];
  currentTabPagingInfo: Pagination | null;
}) => {
  return (
    <>
      <div>{JSON.stringify(currentTabPagingInfo)}</div>
      {JSON.stringify(tabItem)}
    </>
  );
};

export default ArtistTab;
