import { ReactNode } from 'react';

export const VARIANTS = {
  'silver-sand': 'bg-(--badge-silver-sand) text-(--badge-night)',
  'eerie-black': 'bg-(--badge-eerie-black) text-(--badge-silver-grey)',
  'raisin-black': 'bg-(--badge-raisin-black) text-(--badge-neon-silver)',
  black: 'bg-(--badge-black) text-(--badge-shiny-nickel)',
  'jet-black': 'bg-(--badge-jet) text-(--badge-silver)',
} as const;

const Badge = ({
  children,
  className = '',
  onClick,
  variant = 'jet-black',
  disabled,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?:
    | 'silver-sand'
    | 'eerie-black'
    | 'raisin-black'
    | 'black'
    | 'jet-black';
  disabled: boolean;
}) => {
  return (
    <button
      className={`text-(length:--text-fluid-s) text-center rounded-md shadow-(--shadow-button) text-nowrap py-2 px-1 ${VARIANTS[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Badge;
