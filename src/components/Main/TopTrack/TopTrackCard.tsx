import { TrackSearchResult } from '@/models/Spotify';

import Card from '@/components/_shared/Card';

const TopTrackCard = ({
  item,
  index,
}: {
  item: TrackSearchResult['items'][0];
  index: number;
}) => {
  return (
    <Card
      key={item?.id}
      coverImage={item?.album?.images?.[0]?.url ?? '#'}
      contextUri={item.album.uri}
      isPlayable={true}
      externalUrls={item?.external_urls?.spotify}
      cardStyle={{ width: '12rem' }}
      offset={{ position: item.track_number - 1 }}
      title={`${index + 1}. ${item?.name}`}
      titleTag={`${item.album.name} #${item.track_number}`}
    />
  );
};

export default TopTrackCard;
