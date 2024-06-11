import { getArtists } from '@/api/spotify';
import { Artist } from '@/models/Profile';
import { CurrentlyPlayingTrack } from '@/models/track';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import ArtistInfoCard from './ArtistInfoCard';
import './artist-info.scss';

export default function ArtistInfo({
  artists,
}: Readonly<{
  artists: CurrentlyPlayingTrack['item']['artists'];
}>) {
  const [artistInfo, setArtistInfo] = useState<Artist[] | null>(null);

  useEffect(() => {
    const artistIds = artists.map(v => v.id);
    getArtists(artistIds).then(v => setArtistInfo(v));
  }, [artists]);

  return (
    <ul className={classNames('artist-info')}>
      <section className={classNames('artist-info-card')}>
        <h1 className={classNames('about-the-artist')}>About the artist</h1>
        {artistInfo?.map(artist => (
          <ArtistInfoCard artist={artist} key={artist.id} />
        ))}
      </section>
    </ul>
  );
}
