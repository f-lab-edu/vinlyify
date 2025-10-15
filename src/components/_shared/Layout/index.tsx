import { ReactNode } from 'react';

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <section className="text-(--light-grey-200) bg-(--grey-500) p-[1.2rem]">
      {children}
    </section>
  );
}
