import NothingToShow from '@/components/Main/_shared/NothingToShow/NothingToShow';
import { useCurrentPlayingTrackLyrics } from '@/hooks/query/useCurrentPlayingTrackLyrics';
import '@/style/music-info/album.scss';
import classNames from 'classnames/bind';
import Style from './lyrics.module.scss';

export interface CurrentlyPlayingTrackLyrics {
  term: string;
  artist: string;
}

const style = classNames.bind(Style);

const randomLengthsList = Array.from({ length: 6 }, () => (
  <div className={style('wrap')}>
    <div
      className={style(
        'skeleton',
        'content',
        `size${Math.floor(Math.random() * 10) % 5}`,
      )}
    ></div>
  </div>
));

const LyricsSkeleton = () => {
  return (
    <div className={style('lyrics-body')}>
      <div className={style('skeleton', 'title')}></div>
      <br />
      <br />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className={style('verse-wrap')}>
          {randomLengthsList}
        </div>
      ))}
    </div>
  );
};

const Lyrics = ({ term, artist }: CurrentlyPlayingTrackLyrics) => {
  const { data, isLoading } = useCurrentPlayingTrackLyrics({
    term,
    artist,
  });

  if (isLoading) return <LyricsSkeleton />;
  if (!data?.result)
    return <NothingToShow message={`"${term}"에 해당하는 가사가 없습니다.`} />;
  return (
    <>
      <div className={style('lyrics-body')}>
        {data?.result}
        <div className={style('lyrics-credit')}>lyrics from Genius</div>
      </div>
    </>
  );
};
export default Lyrics;
