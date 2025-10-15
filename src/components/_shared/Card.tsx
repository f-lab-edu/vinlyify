import CoverImage from '@/components/_shared/CoverImage';
import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { CSSProperties, HtmlHTMLAttributes, RefObject } from 'react';
import { InView } from 'react-intersection-observer';
import Player from './Player';

export interface CardProps extends HtmlHTMLAttributes<HTMLLIElement> {
  title?: string;
  titleTag?: string | null;
  coverImage?: string;
  isPlayable?: boolean;
  contextUri: string;
  externalUrls?: string;
  id?: string;
  offset?: { uri: string } | { position: number };
}

const CardSkeleton = () => {
  return (
    <li className={`list-none w-full inline-flex flex-col gap-2 m-0 p-0`}>
      <CoverImage.Skeleton />
      <ul>
        <li className="wrap">
          <span className={`inline-block w-full h-4 animate-pulse`} />
        </li>
        <span className={`inline-block w-full h-8  animate-pulse`} />
      </ul>
    </li>
  );
};

const Card = ({
  titleTag,
  children,
  refs,
  title,
  isPlayable,
  offset,
  coverImage,
  contextUri,
  externalUrls,
  cardStyle,
  id,
  className = '',
}: CardProps & {
  cardStyle?: CSSProperties;
  refs?: RefObject<HTMLUListElement | null>;
}) => {
  return (
    <ul
      ref={refs}
      className={`list-none w-full inline-flex flex-col gap-2 m-0 p-0 ${className}`}
      style={cardStyle}
    >
      <li>
        <CoverImage
          imgUrl={coverImage ?? PLACEHOLDER_IMAGE}
          url={externalUrls}
          id={id}
        />
      </li>
      <li>
        <span className={`text-(length:--text-fluid-m)`}>{title}</span>
      </li>

      <li className={`inline-flex align-middle gap-1`}>
        {isPlayable ? (
          <InView>
            {({ inView, ref }) => (
              <span
                ref={ref}
                className="inline-flex align-middle justify-center"
              >
                <Player
                  offset={offset}
                  contextUri={contextUri}
                  enabled={inView}
                />
              </span>
            )}
          </InView>
        ) : null}
        <span className={`inline-block text-(--light-grey-500)`}>
          {titleTag}
        </span>
      </li>

      {children}
    </ul>
  );
};

Card.Skeleton = CardSkeleton;

export default Card;
