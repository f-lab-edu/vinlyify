import { ReactNode } from 'react';

export default function FullBackground({
  children,
  className = '',
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <div className="h-full w-full align-middle inline-flex justify-center bg-(--grey-100)">
      <div
        className={`w-full text-center align-middle inline-flex flex-col justify-center gap-4 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
