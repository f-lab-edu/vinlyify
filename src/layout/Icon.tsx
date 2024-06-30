import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Style from './icon.module.scss';

const style = classNames.bind(Style);

const Icon = ({ svg, url }: { svg: ReactNode; url: string }) => {
  return (
    <Link className={style('icon', 'button')} to={url}>
      {svg}
    </Link>
  );
};

export default Icon;
