import Spotify from '@/assets/spotifyLogo.svg';
import classNames from 'classnames';
import { HtmlHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import './logo.scss';

export interface logoProps extends HtmlHTMLAttributes<HTMLDivElement> {
  url: string;
  fill?: string;
}

const Logo = ({ url, fill }: logoProps) => {
  return (
    <Link
      to={url}
      className={classNames({ 'logo-skeleton': fill === 'skeleton' })}
    >
      <Spotify />
    </Link>
  );
};
export default Logo;
