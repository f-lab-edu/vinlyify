import { ReactNode } from 'react';

const Album = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={
        'translate-x-[0%] w-(length:--vinyl-album-fluid) aspect-square'
      }
    >
      {children}
    </div>
  );
};
export default Album;
