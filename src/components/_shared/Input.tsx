import classNames from 'classnames';

import { FC, InputHTMLAttributes } from 'react';
import './style.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  color?: 'black';
  outline?: boolean;
  value?: string;
  placeHolder?: string;
}

const Input: FC<InputProps> = ({
  size = 'medium',
  color = 'black',
  outline = false,
  onKeyUp,
  onChange,
  value,
  onKeyDown,
  placeHolder,
}) => {
  return (
    <input
      className={classNames('Input', size, color, { outline })}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      onChange={onChange}
      value={value}
      placeholder={placeHolder}
    />
  );
};
export default Input;
