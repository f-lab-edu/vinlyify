import { Track } from '@/models/Track';
import Grid from '../_shared/Grid';
import { useMultiProfileMap } from '../_shared/hooks/useMultiProfileMap';
import TrackItem from './TrackItem';

const TrackTab = ({ tabItem }: { tabItem: Track[] }) => {
  const artistImgs = useMultiProfileMap({ tabItem });

  return (
    <>
      {/* {paging} */}
      <Grid>
        {tabItem?.map(item => (
          <TrackItem item={item} key={item.id} artistImgUrls={artistImgs} />
        ))}
      </Grid>
    </>
  );
};

export default TrackTab;
