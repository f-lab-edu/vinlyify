export default function AnimatedTitle({
  children,
  className = '',
}: Readonly<{ children: string; className?: string }>) {
  return (
    <span
      className={`will-change-transform animate-neon-lights text-(length:--text-fluid-l) mb-2 inline-block ${className}`}
    >
      {children}
    </span>
  );
}
