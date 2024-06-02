import '@/style/music-info/fixed-wrap.scss';
import classNames from 'classnames';
import { FC, HtmlHTMLAttributes } from 'react';

const FixedWrap: FC<HtmlHTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return (
    <div className={classNames('FixedWrap')}>
      <div className="wrap">{children}</div>
    </div>
  );
};
export default FixedWrap;
