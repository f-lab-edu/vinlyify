import BackIcon from '@/assets/backIcon.svg';
import NextIcon from '@/assets/nextIcon.svg';
import classNames from 'classnames/bind';

import Style from './back-next-button.module.scss';

const style = classNames.bind(Style);

export default function BackNextButton({
  action,
}: Readonly<{
  action: 'back' | 'next';
}>) {
  return (
    <button className={style('back-next-button')}>
      {action === 'back' ? <BackIcon /> : <NextIcon />}
    </button>
  );
}
