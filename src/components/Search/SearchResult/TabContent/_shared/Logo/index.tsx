import Spotify from '@/assets/spotifyLogo.svg';
import { FC, HtmlHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

export interface logoProps extends HtmlHTMLAttributes<HTMLDivElement> {
  url: string;
}

const Logo: FC<logoProps> = ({ url }) => {
  return (
    <Link to={url}>
      <Spotify />
    </Link>
  );
};
export default Logo;
