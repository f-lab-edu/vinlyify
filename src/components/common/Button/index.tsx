import classNames from 'classnames';

import { MouseEvent, ReactNode } from 'react';
import './style.scss';

interface ButtonProps {
  onClick: (e: MouseEvent | null) => void;
  children: ReactNode;
  size?: 'medium' | 'large' | 'small';
  color?: 'black';
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children = '검색',
  size = 'medium',
  color = 'black',
  outline = false,
}) => {
  return (
    <button
      className={classNames('Button', size, color, { outline })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
