import {
  CurrentlyPlayingTrackLyrics,
  useCurrentPlayingTrackLyrics,
} from '@/hooks/query/useCurrentPlayingTrackLyrics';
import '@/style/music-info/album.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Style from './lyrics.module.scss';

const style = classNames.bind(Style);
const Lyrics = ({ term, artist }: CurrentlyPlayingTrackLyrics) => {
  const { data } = useCurrentPlayingTrackLyrics({
    term,
    artist,
  });

  return (
    <>
      {data?.lyrics_body ? (
        <ul className={style('lyrics-body')}>
          {data?.lyrics_body
            ?.split('\n')
            .map((line, index) => <li key={index}>{line}</li>)}
        </ul>
      ) : (
        <>no lyrics</>
      )}
      <Link to={data?.script_tracking_url}>script_tracking_url</Link>
      <Link to={data?.pixel_tracking_url}>pixel_tracking_url</Link>
      <span>{data?.lyrics_copyright}</span>
    </>
  );
};
export default Lyrics;
