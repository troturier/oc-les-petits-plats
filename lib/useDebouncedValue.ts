import { useEffect, useState } from "react";

/**
 * Returns `value` once it has stopped changing for `delay` milliseconds, so the
 * search engine is not run again on every single keystroke.
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}
