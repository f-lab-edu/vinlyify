import '@/style/music-info/print.scss';
import classNames from 'classnames';
import { FC, HtmlHTMLAttributes } from 'react';

const Print: FC<HtmlHTMLAttributes<HTMLDivElement>> = () => {
  return <div className={classNames('print')} />;
};
export default Print;
