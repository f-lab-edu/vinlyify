import classNames from 'classnames';

import { FC, InputHTMLAttributes } from 'react';
import './style.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  placeHolder?: string;
}

const Input: FC<InputProps> = ({
  size = 'medium',
  onKeyUp,
  onChange,
  value,
  onKeyDown,
  placeHolder,
}) => {
  return (
    <input
      className={classNames('Input', size)}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      onChange={onChange}
      value={value}
      placeholder={placeHolder}
    />
  );
};
export default Input;
