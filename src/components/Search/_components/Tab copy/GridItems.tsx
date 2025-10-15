import { memo } from 'react';
import AlbumCard from './Albums/AlbumCard';
import ArtistCard from './Artists/ArtistsCard';
import PlaylistCard from './Playists/PlaylistCard';
import TrackCard from './Tracks/TrackCard';

const componentMap = {
  albums: AlbumCard,
  artists: ArtistCard,
  playlists: PlaylistCard,
  tracks: TrackCard,
} as const;

const GridItems = memo(
  ({ item, tab }: { item: any; tab: keyof typeof componentMap }) => {
    const Component = componentMap[tab];
    return Component ? <Component item={item} /> : null;
  },
);
export default GridItems;
