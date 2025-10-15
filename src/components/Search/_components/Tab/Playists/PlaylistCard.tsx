import { Playlist } from '@/models/Playlist';
import Card from '../../../../_shared/Card';
import PlaylistDescription from './PlaylistDescription';

const PlaylistCard = ({ item }: { item: Playlist }) => {
  return (
    <Card
      title={item.name}
      titleTag={`by. ${item.owner.display_name}`}
      coverImage={item.images?.[0].url}
      contextUri={item.uri}
      offset={{ position: 0 }}
      externalUrls={item.external_urls?.spotify}
      isPlayable={true}
    >
      <li>total tracks : {item.tracks.total}</li>
      {item?.description ? (
        <PlaylistDescription description={item?.description} />
      ) : null}
    </Card>
  );
};

export default PlaylistCard;
