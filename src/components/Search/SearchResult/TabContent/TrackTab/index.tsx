import { Pagination } from '@/models/Pagination';
import { Track } from '@/models/Track';

const TrackTab = ({
  tabItem,
  currentTabPagingInfo,
}: {
  tabItem: Track[];
  currentTabPagingInfo: Pagination | null;
}) => {
  return (
    <>
      <div>{JSON.stringify(currentTabPagingInfo)}</div>
      {JSON.stringify(tabItem)}
    </>
  );
};

export default TrackTab;
