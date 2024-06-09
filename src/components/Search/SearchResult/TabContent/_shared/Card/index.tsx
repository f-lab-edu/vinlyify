import classNames from 'classnames';
import { HtmlHTMLAttributes, ReactNode } from 'react';
import './card.scss';

export interface CardProps extends HtmlHTMLAttributes<HTMLLIElement> {
  center?: boolean;
  title?: string;
  titleTag?: string;
  topContent: ReactNode;
  playButton?: ReactNode;
  isSkeleton?: boolean;
}

const Card = ({
  playButton,
  titleTag,
  center,
  children,
  title,
  topContent,
  isSkeleton,
}: CardProps) => {
  return (
    <li className={classNames('card', { center })}>
      {topContent}

      <ul>
        <li>
          <span className={`title ${isSkeleton ? 'skeleton' : ''}`}>
            {title}
          </span>
        </li>

        <li className="wrap">
          {playButton}{' '}
          <span className={`title-tag ${isSkeleton ? 'skeleton' : ''}`}>
            {titleTag}
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
