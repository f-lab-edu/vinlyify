import { Track } from '@/models/Track';
import classNames from 'classnames/bind';
import Style from './top-track-list.module.scss';

const style = classNames.bind(Style);

export default function TopTrackList({
  topTracks,
}: Readonly<{
  topTracks?: Track[] | null;
}>) {
  return (
    <ul className={style('top-track-list')}>
      {topTracks?.map((track, index) => (
        <li key={track.id}>
          {index + 1}. {track.name}
        </li>
      ))}
    </ul>
  );
}
