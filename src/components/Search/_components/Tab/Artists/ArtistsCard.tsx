import { Artist } from '@/models/Profile';

import compactNumberFormat from '@/utils/string';
import Card from '../../../../_shared/Card';
import GenreList from './GenreList';

const ArtistCard = ({ item }: { item: Artist }) => {
  return (
    <Card
      title={item.name}
      contextUri={item.uri}
      titleTag={
        item?.followers?.total == null
          ? null
          : `followers : ${compactNumberFormat(item?.followers?.total)}`
      }
      coverImage={item?.images?.[0]?.url}
      externalUrls={item?.external_urls?.spotify}
    >
      {item?.genres == null || item?.genres?.length === 0 ? null : (
        <GenreList genres={item.genres} />
      )}
    </Card>
  );
};

export default ArtistCard;
