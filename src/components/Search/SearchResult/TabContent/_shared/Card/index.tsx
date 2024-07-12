import { PLACEHOLDER_IMAGE } from '@/constants/image';
import classNames from 'classnames/bind';
import { HtmlHTMLAttributes } from 'react';
import CoverImage from '../CoverImage';
import Logo from '../Logo';
import PlayButton from '../PlayButton';
import Style from './card.module.scss';

const style = classNames.bind(Style);

export interface CardProps extends HtmlHTMLAttributes<HTMLLIElement> {
  center?: boolean;
  title?: string;
  titleTag?: string | null;
  coverImage?: string;
  isPlayable?: boolean;
  contextUri: string;
  externalUrls?: string;
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
  titleTag,
  center,
  children,
  title,
  isPlayable,
  coverImage,
  contextUri,
  externalUrls,
}: CardProps) => {
  return (
    <li className={style('card', { center })}>
      <CoverImage
        imgUrl={coverImage === undefined ? PLACEHOLDER_IMAGE : coverImage}
        url={externalUrls}
      />
      <ul>
        <li>
          <span className={style('title')}>{title}</span>
        </li>

        <li className={style('wrap')}>
          {isPlayable ? <PlayButton context_uris={contextUri} /> : null}

          <span className={style('title-tag')}>{titleTag}</span>
        </li>
        {children}
      </ul>
    </li>
  );
};

Card.Skeleton = CardSkeleton;

export default Card;
