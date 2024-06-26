import classNames from 'classnames/bind';
import Style from './animated-title.module.scss';

const style = classNames.bind(Style);

export default function AnimatedTitle({ children }: { children: string }) {
  return <span className={style('animated-title')}>{children}</span>;
}
