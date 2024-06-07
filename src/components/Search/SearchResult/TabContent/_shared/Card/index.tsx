import classNames from 'classnames';
import { FC, HtmlHTMLAttributes, ReactNode } from 'react';
import './card.scss';

export interface CardProps extends HtmlHTMLAttributes<HTMLLIElement> {
  center?: boolean;
  title?: string;
  title_tag?: string;
  left: ReactNode;
  playButton?: ReactNode;
  isSkeleton?: boolean;
}

const Card: FC<CardProps> = ({
  playButton,
  title_tag,
  center,
  children,
  title,
  left,
  isSkeleton,
}) => {
  return (
    <li className={classNames('card', { center })}>
      {left}

      <ul>
        <li>
          <span className={`title ${isSkeleton ? 'skeleton' : ''}`}>
            {title}
          </span>
        </li>

        <li className="wrap">
          {playButton}{' '}
          <span className={`title-tag ${isSkeleton ? 'skeleton' : ''}`}>
            {title_tag}
          </span>
        </li>
        {isSkeleton ? (
          <li>
            <span className="content skeleton"></span>
          </li>
        ) : (
          children
        )}
      </ul>
    </li>
  );
};

export default Card;
