import { TTimeout } from "@types";
import { POLLING_INTERVAL } from "@utils/constants";
import { useCallback, useEffect, useRef } from "react";

export const usePolling = (
  callback: () => Promise<unknown>,
  interval: number = POLLING_INTERVAL
) => {
  const timeout = useRef<TTimeout>(null);
  const mountedRef = useRef(false);

  const polling = useCallback(async () => {
    await callback();
    if (mountedRef.current) {
      timeout.current = setTimeout(polling, interval);
    }
  }, [callback, interval]);

  useEffect(() => {
    mountedRef.current = true;
    polling();
    
    return () => {
      mountedRef.current = false;
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [polling]);
};
