import { Pagination } from '@/models/Pagination';
import { Track } from '@/models/Track';
import Grid from '../_shared/Grid';
import { useMultiProfileMap } from '../_shared/MutliProfile/hooks/useMultiProfileMap';
import TrackItem from './TrackItem';

const TrackTab = ({
  tabItem,
  currentTabPagingInfo,
}: {
  tabItem: Track[];
  currentTabPagingInfo: Pagination | null;
}) => {
  const artistImgs = useMultiProfileMap({ tabItem });
  return (
    <Grid>
      {tabItem?.map(item => (
        <TrackItem item={item} key={item.id} artistImgUrls={artistImgs} />
      ))}
    </Grid>
  );
};

export default TrackTab;
