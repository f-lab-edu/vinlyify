import { ReactNode } from 'react';

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <section className="text-(--white) bg-(--grey-500) p-5">{children}</section>
  );
}
