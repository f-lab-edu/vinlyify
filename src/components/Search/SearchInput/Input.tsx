import classNames from 'classnames/bind';

import { FC, InputHTMLAttributes } from 'react';
import Style from './input.module.scss';

const style = classNames.bind(Style);

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
      className={style('input', size)}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      onChange={onChange}
      value={value}
      placeholder={placeHolder}
    />
  );
};
export default Input;
