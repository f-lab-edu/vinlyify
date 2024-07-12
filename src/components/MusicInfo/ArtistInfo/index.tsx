import { useArtist } from '@/hooks/query/useArtist';
import { Artist } from '@/models/Profile';
import classNames from 'classnames/bind';
import ArtistInfoCard from './ArtistInfoCard';
import Style from './artist-info.module.scss';

const style = classNames.bind(Style);

export default function ArtistInfo({
  artists,
}: Readonly<{
  artists: Artist[];
}>) {
  const { data } = useArtist({ artists });

  return (
    <ul className={style('artist-info')}>
      <section className={style('artist-info-card')}>
        <h1 className={style('about-the-artist')}>About the artist</h1>
        {data?.map(artist => (
          <ArtistInfoCard artist={artist} key={artist.id} />
        ))}
      </section>
    </ul>
  );
}
