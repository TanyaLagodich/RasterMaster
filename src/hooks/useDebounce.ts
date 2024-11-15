import { useRef } from 'react';

export function useDebounce(callback: () => void, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = () => {
      if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
          callback();
      }, delay);
  };

  return debouncedCallback;
}