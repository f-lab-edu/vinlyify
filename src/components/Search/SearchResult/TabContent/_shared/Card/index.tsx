import classNames from 'classnames/bind';
import { HtmlHTMLAttributes, ReactNode } from 'react';
import CoverImage from '../CoverImage';
import Logo from '../Logo';
import PlayButton from '../PlayButton';
import Style from './card.module.scss';

const style = classNames.bind(Style);

export interface CardProps extends HtmlHTMLAttributes<HTMLLIElement> {
  center?: boolean;
  title?: string;
  title_tag?: string | null;
  topContent: ReactNode;
  isPlayable?: boolean;
  contextUri: string;
}

const CardSkeleton = () => {
  return (
    <li className={style('card')}>
      <CoverImage.Skeleton />
      <Logo url="" className={style('loading-logo')} fill="skeleton" />
      <ul>
        <li className="wrap">
          <span className={style('title-tag', 'skeleton')} />
        </li>
        <span className={style('content', 'skeleton')} />
      </ul>
    </li>
  );
};

const Card = ({
  title_tag,
  center,
  children,
  title,
  topContent,
  isPlayable,
  contextUri,
}: CardProps) => {
  return (
    <li className={style('card', { center })}>
      {topContent}

      <ul>
        <li>
          <span className={style('title')}>{title}</span>
        </li>

        <li className={style('wrap')}>
          {isPlayable ? <PlayButton context_uris={contextUri} /> : null}

          <span className={style('title-tag')}>{title_tag}</span>
        </li>
        {children}
      </ul>
    </li>
  );
};

Card.Skelton = CardSkeleton;

export default Card;
