import Spotify from '@/assets/spotifyLogo.svg';
import classNames from 'classnames';
import { FC, HtmlHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import './logo.scss';

export interface logoProps extends HtmlHTMLAttributes<HTMLDivElement> {
  url: string;
  fill?: string;
}

const Logo: FC<logoProps> = ({ url, fill }) => {
  return (
    <Link
      to={url}
      className={classNames(`logo${fill === 'skeleton' ? '-skeleton' : ''}`, {
        fill,
      })}
    >
      <Spotify />
    </Link>
  );
};
export default Logo;
