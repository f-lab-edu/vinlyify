import classNames from 'classnames';
import { HtmlHTMLAttributes, ReactNode } from 'react';
import './card.scss';

export interface CardProps extends HtmlHTMLAttributes<HTMLLIElement> {
  center?: boolean;
  title?: string;
  playButton?: ReactNode;
  titleTag?: string;
}

const Card = ({ playButton, children, title, titleTag }: CardProps) => {
  return (
    <li className={classNames('card')}>
      <ul>
        <li>
          <span className={classNames('title')}>{title}</span>
        </li>

        <li className="wrap">
          {playButton}
          <span className={classNames('title-tag')}>{titleTag}</span>
        </li>
        {children}
      </ul>
    </li>
  );
};

export default Card;
