import classNames from 'classnames';
import { HtmlHTMLAttributes, ReactNode } from 'react';
import './card.scss';

export interface CardProps extends HtmlHTMLAttributes<HTMLLIElement> {
  center?: boolean;
  title?: string;
  title_tag?: string;
  left: ReactNode;
  playButton?: ReactNode;
  isSkeleton?: boolean;
}

const Card = ({
  playButton,
  title_tag,
  center,
  children,
  title,
  left,
}: CardProps) => {
  return (
    <li className={classNames('card', { center })}>
      {left}
      <ul>
        <li>
          <span className={classNames('title')}>{title}</span>
        </li>

        <li className="wrap">
          {playButton}
          <span className={classNames('title-tag')}>{title_tag}</span>
        </li>
        {children}
      </ul>
    </li>
  );
};

export default Card;
