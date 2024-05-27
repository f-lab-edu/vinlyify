import classNames from 'classnames';

import { FC, ReactNode } from 'react';
import './style.scss';

interface FlexWrapProps {
  children: ReactNode;
  color?: 'black' | 'white';
  gap?: 'l' | 'm' | 'sm';
  center?: 'center' | 'flex-start';
}

const FlexWrap: FC<FlexWrapProps> = ({
  children,
  color = 'black',
  gap = 'm',
  center = 'flex-start',
}) => {
  return (
    <section className={classNames('FlexWrap', color, gap, center)}>
      {children}
    </section>
  );
};
export default FlexWrap;
