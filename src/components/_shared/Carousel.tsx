import { ReactNode } from 'react';

const Carousel = ({ children }: { children: ReactNode }) => {
  return (
    <div className="inline-flex align-middle w-full gap-4">
      <div className="overflow-hidden">
        <section className="inline-flex gap-4 animate-carousel hover:[animation-play-state:paused]">
          {children}
        </section>
      </div>
    </div>
  );
};

export default Carousel;
