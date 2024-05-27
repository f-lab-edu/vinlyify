import classNames from 'classnames';

import { MouseEvent, ReactNode } from 'react';
import './style.scss';

interface ButtonProps {
  onClick: (e: MouseEvent | null) => void;
  children: ReactNode;
  size?: 'medium' | 'large' | 'small';
  color?: 'black';
  outline?: boolean;
  alt?: 'string';
  disabled?: boolean;
  active?: number;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children = '검색',
  size = 'medium',
  color = 'black',
  outline = false,
  disabled = false,
  active,
}) => {
  return (
    <button
      disabled={disabled}
      className={classNames('Button', size, color, active, {
        outline,
        disabled,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
