import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Style from './nothing-to-show.module.scss';

const style = classNames.bind(Style);

interface NothingToShowProps {
  message: string;
  redirect?: { text: string; path: string };
}

export default function NothingToShow({
  message,
  redirect,
}: NothingToShowProps) {
  return (
    <div className={style('content-body')}>
      <div className={style('content-wrap')}>
        <span className={style('message')}>{message}</span>
        {redirect?.path ? (
          <Link className={style('link')} to={redirect.path}>
            {redirect.text}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
