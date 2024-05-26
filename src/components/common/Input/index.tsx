import classNames from 'classnames';

import { ChangeEvent, FC, KeyboardEvent } from 'react';
import './style.scss';

interface InputProps {
  useDefaultValue?: boolean;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultSearchWord: string;
  size?: 'medium' | 'large' | 'small';
  color?: 'black';
  outline?: boolean;
  value?: string;
}

const Input: FC<InputProps> = ({
  useDefaultValue,
  size = 'medium',
  color = 'black',
  outline = false,
  onKeyUp,
  onChange,
  value,
  onKeyDown,
  defaultSearchWord,
}) => {
  return (
    <input
      className={classNames('Input', size, color, { outline })}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      onChange={onChange}
      value={value}
      placeholder={
        !useDefaultValue
          ? '검색 키워드 입력'
          : `${defaultSearchWord}를 바탕으로 한 결과입니다.`
      }
    />
  );
};
export default Input;
