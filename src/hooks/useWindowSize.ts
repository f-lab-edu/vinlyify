import { useEffect, useState } from 'react';

type WindowSize = { width: number; height: number };

export function useThrottledWindowSize(throttleMs: number = 200): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    let lastRan = Date.now();

    const handleResize = () => {
      const now = Date.now();
      if (now - lastRan >= throttleMs) {
        setSize({ width: window.innerWidth, height: window.innerHeight });
        lastRan = now;
      }
    };

    window.addEventListener('resize', handleResize);

    // initial set
    setSize({ width: window.innerWidth, height: window.innerHeight });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [throttleMs]);

  return size;
}
