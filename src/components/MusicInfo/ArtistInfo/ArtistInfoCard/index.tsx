import { getArtistTopTracks } from '@/api/spotify';
import { PLACEHOLDER_IMAGE } from '@/constants';
import { Artist } from '@/models/Profile';
import { Track } from '@/models/track';
import classNames from 'classnames';
import { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TopTrackList from '../TopTrackList';
import './artist-info-card.scss';

export default function ArtistInfoCard({
  artist,
}: Readonly<{
  artist: Artist;
}>) {
  const [topTracks, setTopTracks] = useState<Track[] | null>(null);

  useEffect(() => {
    getArtistTopTracks({ id: artist.id }).then(v => {
      setTopTracks(v?.tracks);
    });
  }, [artist]);

  return (
    <ul className={classNames('artist-info-wrap')}>
      <Suspense fallback={<img src={PLACEHOLDER_IMAGE} alt="loading" />}>
        <Link to={artist?.external_urls?.spotify || ''}>
          <img
            src={
              artist?.images != null ? artist?.images[0].url : PLACEHOLDER_IMAGE
            }
            alt={artist.name}
            className={classNames('artist-profile')}
          ></img>
        </Link>
      </Suspense>
      <ul>
        <>
          <h2 className={classNames('artist-name')}>
            {artist?.name}{' '}
            <span className={classNames('followers')}>
              followers : {artist?.followers?.total}
            </span>
          </h2>
        </>
        <li>genres: {artist?.genres}</li>

        <h3>Top tracks</h3>
        <TopTrackList topTracks={topTracks} />
      </ul>
    </ul>
  );
}
