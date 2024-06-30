import VinylifyLogo from '@/assets/vinylifyLogo.svg';

import classNames from 'classnames/bind';
import Style from './vinylify-icon.module.scss';

const style = classNames.bind(Style);

const VinylifyIcon = () => {
  return (
    <div className={style('vinylify-icon')}>
      <VinylifyLogo />
    </div>
  );
};

export default VinylifyIcon;
