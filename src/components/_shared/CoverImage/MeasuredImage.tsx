import { imageCache } from '@/components/Search/_components/VirtualGrid';
import { memo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface MeasuredImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export const MeasuredImageBase = ({
  src,
  alt,
  className = '',
  ...props
}: Readonly<MeasuredImageProps>) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(() => imageCache.has(src));
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleLoad = () => {
    imageCache.add(src);
    setLoaded(true);
  };

  return (
    <div
      ref={ref}
      className={`relative w-full aspect-square rounded-[4px] overflow-hidden shadow-(--shadow-basic) ${className}`}
    >
      <div
        className={`absolute inset-0 bg-(--grey-600) transition-opacity duration-500
          ${loaded ? 'opacity-0' : 'opacity-100 animate-pulse'}`}
      />

      {inView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt || src}
          loading="lazy"
          onLoad={handleLoad}
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500
            ${loaded ? 'opacity-100' : 'opacity-0'}`}
          {...props}
        />
      )}
    </div>
  );
};

const MeasuredImage = memo(MeasuredImageBase);
export default MeasuredImage;
