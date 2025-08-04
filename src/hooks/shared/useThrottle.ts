import { TFunctionWithArgs } from "@types";
import { useCallback, useRef } from "react";

export type TUseThrottleArgs<Args extends unknown[]> = {
  fn: TFunctionWithArgs<Args>;
  limit?: number;
};

export const useThrottle = <Args extends unknown[]>({
  fn,
  limit = 250,
}: TUseThrottleArgs<Args>): TFunctionWithArgs<Args> => {
  const lastRun = useRef(Date.now());

  const throttledFunction = useCallback(
    (...args: Args) => {
      if (Date.now() - lastRun.current >= limit) {
        fn(...args);
        lastRun.current = Date.now();
      }
    },
    [fn, limit]
  );

  return throttledFunction;
};
