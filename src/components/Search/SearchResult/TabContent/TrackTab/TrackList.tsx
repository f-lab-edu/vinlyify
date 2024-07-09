import { Track } from '@/models/Track';
import { TabProps } from '..';
import { useMultiProfileMap } from '../_shared/MutliProfile/hooks/useMultiProfileMap';
import TrackItem from './TrackItem';

interface TrackListProps extends TabProps {
  tabItem: Track[];
}

const TrackList = ({ tabItem, innerRef }: TrackListProps) => {
  const artistImgs = useMultiProfileMap({ tabItem });
  return tabItem.map((item, index) =>
    index === tabItem.length - 1 ? (
      <TrackItem
        item={item}
        key={item.id}
        innerRef={innerRef}
        artistImgUrls={artistImgs}
      />
    ) : (
      <TrackItem item={item} key={item.id} artistImgUrls={artistImgs} />
    ),
  );
};

export default TrackList;
