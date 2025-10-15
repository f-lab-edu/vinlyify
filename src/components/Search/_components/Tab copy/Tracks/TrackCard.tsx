import { Track } from '@/models/Track';
import { HHMMSSFormat } from '@/utils/time';
import { useMemo } from 'react';
import Card from '../../../../_shared/Card';
import ArtistProfile from '../../Profile/ArtistProfile';

export const TrackCard = ({ item }: { item: Track }) => {
  const artists = useMemo(() => {
    return [...new Set(item.artists.map(artist => artist.id))];
  }, [item]);
  const trackDurationHHMMSS = useMemo(
    () => HHMMSSFormat({ utcTime: item.duration_ms }),
    [item],
  );

  return (
    <Card
      title={item.name}
      offset={{ uri: item.uri }}
      contextUri={item.album.uri}
      titleTag={`${item.album.name} #${item.track_number}`}
      coverImage={item.album.images?.[0]?.url}
      externalUrls={item.external_urls?.spotify}
      isPlayable={item.is_playable}
    >
      <li>재생 시간: {trackDurationHHMMSS}</li>
      <ArtistProfile artists={artists} />
    </Card>
  );
};

export default TrackCard;
