import { LOADING_IMAGE, PLACEHOLDER_IMAGE } from '@/constants';
import classNames from 'classnames';
import { Suspense } from 'react';

export default function Image({
  url,
  classNameArr,
}: {
  url?: string;
  classNameArr: string[];
}) {
  return (
    <Suspense
      fallback={
        <img
          alt={url}
          src={LOADING_IMAGE}
          className={classNames(...classNameArr, 'skeleton')}
        />
      }
    >
      <img
        src={url ?? PLACEHOLDER_IMAGE}
        loading="lazy"
        alt={PLACEHOLDER_IMAGE}
      />
    </Suspense>
  );
}
