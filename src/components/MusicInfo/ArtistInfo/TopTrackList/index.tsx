import { Track } from '@/models/track';
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
      {topTracks?.map((v, i) => (
        <li key={v.id}>
          {i + 1}. {v.name}
        </li>
      ))}
    </ul>
  );
}
