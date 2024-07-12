import Spotify from '@/assets/spotifyLogo.svg';
import classNames from 'classnames';
import { HtmlHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import './logo.scss';

export interface LogoProps extends HtmlHTMLAttributes<HTMLDivElement> {
  url: string;
  fill?: string;
}

const Logo = ({ url, fill }: LogoProps) => {
  return (
    <Link
      to={url}
      aria-disabled={url == null}
      className={classNames('logo', { 'logo-skeleton': fill === 'skeleton' })}
    >
      <Spotify />
    </Link>
  );
};
export default Logo;
