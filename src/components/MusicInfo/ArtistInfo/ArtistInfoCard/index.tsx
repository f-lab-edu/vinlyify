import { PLACEHOLDER_IMAGE } from '@/constants';
import { useArtistTopTracks } from '@/hooks/query/useArtistTopTracks';
import { Artist } from '@/models/Profile';
import classNames from 'classnames';
import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import TopTrackList from '../TopTrackList';
import './artist-info-card.scss';

export default function ArtistInfoCard({
  artist,
}: Readonly<{
  artist: Artist;
}>) {
  const { data } = useArtistTopTracks({ artistId: artist.id });

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
        {artist?.genres && artist?.genres?.length > 0 && (
          <li>genres: {artist?.genres}</li>
        )}

        <h3>Top tracks</h3>
        <TopTrackList topTracks={data?.tracks} />
      </ul>
    </ul>
  );
}
