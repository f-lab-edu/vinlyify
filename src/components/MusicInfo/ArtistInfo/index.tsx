import AnimatedTitle from '@/components/_shared/AnimatedTitle';
import { ReactNode } from 'react';

export default function ArtistInfo({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <AnimatedTitle>Artists</AnimatedTitle>
      <ul className={'p-0 mb-10'}>
        <section
          className={
            'bg-(--grey-300) p-4 w-full inline-flex flex-col rounded-[4px] shadow-(--shadow-basic)'
          }
        >
          <span className={'inline-block text-(length:--text-fluid-lg)'}>
            About the artist
          </span>
          {children}
        </section>
      </ul>
    </>
  );
}
