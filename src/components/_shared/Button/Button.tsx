import { ReactNode } from 'react';

const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    // <button className="border-none p-0 hover:cursor-pointer" onClick={onClick}>
    //   {children}
    // </button>
    <button
      className={
        'border-none hover:cursor-pointer fill-(--color-white) hover:fill-(--grey-100) p-0 w-4 mr-1'
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
