import { ReactNode } from 'react';

const FixedWrap = ({ children }: { children: ReactNode }) => {
  return (
    <div className={'w-full relative inline-flex flex-col align-middle '}>
      <div className="text-(--color-white) bg-(--light-grey-400) p-(--p-fluid-s) h-full inline-flex w-(length:--vinyl-album-fluid) align-middle justify-center-safe">
        {children}
      </div>
    </div>
  );
};
export default FixedWrap;
