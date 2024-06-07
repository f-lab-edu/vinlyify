import classNames from 'classnames';
import { FC, HtmlHTMLAttributes, ReactNode } from 'react';
import './card.scss';

export interface CardProps extends HtmlHTMLAttributes<HTMLDivElement> {
  center?: boolean;
  title?: string;
  title_tag?: string;
  left: ReactNode;
  playButton?: ReactNode;
}

const Card: FC<CardProps> = ({
  playButton,
  title_tag,
  center,
  children,
  title,
  left,
}) => {
  return (
    <div className={classNames('card', { center })}>
      {left}

      <ul>
        <li>
          <span className="title">{title}</span>
        </li>

        <li className="wrap">
          {playButton} <span className="title_tag">{title_tag}</span>
        </li>
        {children}
      </ul>
    </div>
  );
};

export default Card;