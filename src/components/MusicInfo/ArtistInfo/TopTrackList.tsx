import { Track } from '@/models/Track';
import { Link } from 'react-router-dom';

const TopTrack = ({
  url = '',
  index,
  name,
}: {
  url?: string;
  name?: string;
  index: number;
}) => {
  return (
    <li>
      <Link
        to={url}
        className="hover:text-(--grey-600) hover:underline underline-offset-2"
      >
        {index + 1}. {name}
      </Link>
    </li>
  );
};

export default function TopTrackList({
  topTracks,
}: Readonly<{
  topTracks?: Track[] | null;
}>) {
  return (
    <span className="inline-block">
      <span className={'text-(length:--text-fluid-lg)'}> Top tracks</span>

      <ul className={''}>
        {topTracks?.map((track, index) => (
          <TopTrack
            name={track?.name}
            index={index}
            key={track.id}
            url={track.external_urls?.spotify}
          />
        ))}
      </ul>
    </span>
  );
}
