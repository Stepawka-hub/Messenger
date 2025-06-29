import { useCallback, useRef } from "react";

type DebouncedFunction<Args extends unknown[]> = (...args: Args) => void;
type TTimeout = ReturnType<typeof setTimeout> | undefined;

export const useDebounce = <Args extends unknown[]>(
  callback: DebouncedFunction<Args>,
  delay: number = 1000
): DebouncedFunction<Args> => {
  const timer = useRef<TTimeout>(null);

  const debouncedFunction = useCallback(
    (...args: Args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedFunction;
};
