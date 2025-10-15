import { BLACK_TEXTURE } from '@/constants/image';
import { ReactNode } from 'react';

const VinylBody = ({
  children,
  imgUrl,
}: {
  children: ReactNode;
  imgUrl: string;
}) => {
  return (
    <div
      style={{ backgroundImage: `url(${imgUrl})` }}
      className={`animate-vinyl absolute top-[2.5%] left-[3.5%] z-0 w-(--vinyl-body-fluid) h-[95%] inline-block [background-blend-mode:overlay] [background-size:106%_106%] bg-center shadow-vinyl rounded-full max-h-[38vh] max-w-[38vh] before:absolute before:top-[2.5%] before:left-[2.5%] before:z-10 before:w-[95%] before:h-[95%] before:bg-[url(${BLACK_TEXTURE})] before:[background-size:100%_100%] before:rounded-full before:mix-blend-screen before:opacity-30 before:content-['']`}
    >
      {children}
    </div>
  );
};
export default VinylBody;
