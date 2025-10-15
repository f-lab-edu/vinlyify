import { LOADING_IMAGE, PLACEHOLDER_IMAGE } from '@/constants/image';
import { Suspense } from 'react';

export default function Image({
  url,
}: Readonly<{
  url?: string;
}>) {
  return (
    <Suspense fallback={<img alt={url} src={LOADING_IMAGE} />}>
      <img
        src={url ?? PLACEHOLDER_IMAGE}
        loading="lazy"
        key={url}
        alt={PLACEHOLDER_IMAGE}
      />
    </Suspense>
  );
}
