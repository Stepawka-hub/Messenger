import { TFunctionWithArgs, TTimeout } from "@types";
import { useCallback, useRef } from "react";

export const useDebounce = <Args extends unknown[]>(
  callback: TFunctionWithArgs<Args>,
  delay: number = 1000
): TFunctionWithArgs<Args> => {
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
