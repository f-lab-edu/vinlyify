import { PLACEHOLDER_IMAGE } from '@/constants/image';
import { DetailedHTMLProps } from 'react';

import SpotifyIcon from '@/components/_shared/Icons/Spotify';
import { Link } from 'react-router-dom';
import MeasuredImage from './MeasuredImage';
export interface ImgUrlProps
  extends DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  imgUrl?: string;
  url?: string;
}

const CoverImage = ({ imgUrl, url }: ImgUrlProps) => {
  return (
    <Link
      to={url ?? '#'}
      className="relative inline-block w-full"
      aria-disabled={url == null}
    >
      <MeasuredImage src={imgUrl ?? PLACEHOLDER_IMAGE} alt={imgUrl} />
      <span className="absolute bottom-1 right-1 inline-block text-(length:--text-fluid-s)">
        <SpotifyIcon />
      </span>
    </Link>
  );
};

const CoverImageSkeleton = () => {
  return (
    <span className="animate-pulse w-full bg-(--grey-600) rounded-[4px] aspect-square shadow-(--shadow-basic) inline-block relative overflow-hidden" />
  );
};

CoverImage.Skeleton = CoverImageSkeleton;

export default CoverImage;
