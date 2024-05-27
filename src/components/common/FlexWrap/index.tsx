import classNames from 'classnames';

import { FC, ReactNode } from 'react';
import './style.scss';

interface FlexWrapProps {
  children: ReactNode;
  color?: 'black' | 'white';
  gap?: 'l' | 'm' | 'sm';
}

const FlexWrap: FC<FlexWrapProps> = ({
  children,
  color = 'black',
  gap = 'm',
}) => {
  return (
    <section className={classNames('FlexWrap', color, gap)}>{children}</section>
  );
};
export default FlexWrap;
