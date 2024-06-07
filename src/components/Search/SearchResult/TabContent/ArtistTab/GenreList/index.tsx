import { Artist } from '@/models/Profile';
import Badge from './Badge';
import './genre-list.scss';

const GenreList = ({ genres }: { genres: Artist['genres'] }) => {
  return (
    <ul className="genre-list">
      {genres?.map((genre, i) => (
        <Badge key={genre} badgeNumber={i + 1}>
          {genre}
        </Badge>
      ))}
    </ul>
  );
};
export default GenreList;
