import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import Style from './layout.module.scss';
const style = classNames.bind(Style);
export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <section className={style('layout')}>{children}</section>;
}
