import '@/style/music-info/vinyl-body.scss';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { ImgUrlProps } from './Cover';

interface ContainerProps extends ImgUrlProps {
  children: ReactNode;
}

const VinylBody: FC<ContainerProps> = ({ children, imgUrl }) => {
  return (
    <div
      style={{ backgroundImage: `url(${imgUrl})` }}
      className={classNames('vinylBody')}
    >
      {children}
    </div>
  );
};
export default VinylBody;
