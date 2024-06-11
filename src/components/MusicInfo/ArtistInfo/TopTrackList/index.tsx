import { Track } from '@/models/track';
import classNames from 'classnames';
import './top-track-list.scss';
export default function TopTrackList({
  topTracks,
}: Readonly<{
  topTracks: Track[] | null;
}>) {
  return (
    <ul className={classNames('top-track-list')}>
      {topTracks?.map((v, i) => (
        <li key={v.id} className={classNames('track-item')}>
          {i + 1}. {v.name}
        </li>
      ))}
    </ul>
  );
}
