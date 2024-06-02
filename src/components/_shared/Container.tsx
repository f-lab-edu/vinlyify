import classNames from 'classnames';
import { FC, HtmlHTMLAttributes, ReactNode } from 'react';
import './style.scss';

interface ContainerProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  center?: boolean;
  pd?: 'lg' | 'md' | 'sm';
  mg?: 'lg' | 'md' | 'sm';
}

const Container: FC<ContainerProps> = ({
  children,
  center = true,
  pd = 'md',
}) => {
  return (
    <div className={classNames('container', { center }, pd)}>{children}</div>
  );
};
export default Container;
