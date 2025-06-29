import { useEffect, useState } from 'react';

export function useDebouncer<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler); // Clear on unmount or value change
  }, [value, delay]);

  return debouncedValue;
}
