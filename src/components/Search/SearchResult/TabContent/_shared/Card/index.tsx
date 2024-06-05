import classNames from 'classnames';
import { FC, HtmlHTMLAttributes, ReactNode } from 'react';
import './card.scss';

export interface CardProps extends HtmlHTMLAttributes<HTMLDivElement> {
  imgUrl?: string;
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
          <text className="title">{title}</text>
        </li>

        <li className="wrap">
          {playButton} <text className="title_tag">{title_tag}</text>
        </li>
        {children}
      </ul>
    </div>
  );
};

export default Card;
