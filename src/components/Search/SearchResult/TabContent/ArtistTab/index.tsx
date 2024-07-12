import { Artist } from '@/models/Profile';
import Card from '../_shared/Card';

import compactNumberFormat from '@/utils/string';
import GenreList from './GenreList';

const ArtistItem = ({ item }: { item: Artist }) => {
  if (item?.name == null) {
    return <Card.Skeleton />;
  }
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
      {item?.genres && item.genres?.length > 0 ? (
        <GenreList genres={item?.genres} />
      ) : null}
    </Card>
  );
};

const ArtistTab = ({ tabItem }: { tabItem: Artist[] }) => {
  return tabItem?.map((item, index) => (
    <ArtistItem item={item} key={item.id + index} />
  ));
};

export default ArtistTab;
