import classNames from 'classnames';

import { ChangeEvent, FC, KeyboardEvent } from 'react';
import './style.scss';

interface InputProps {
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;

  size?: 'medium' | 'large' | 'small';
  color?: 'black';
  outline?: boolean;
  value?: string;
}

const Input: FC<InputProps> = ({
  size = 'medium',
  color = 'black',
  outline = false,
  onKeyUp,
  onChange,
  value,
}) => {
  return (
    <input
      className={classNames('Input', size, color, { outline })}
      onKeyUp={onKeyUp}
      onChange={onChange}
      value={value}
    />
  );
};
export default Input;
