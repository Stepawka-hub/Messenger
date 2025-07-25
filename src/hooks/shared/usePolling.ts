import { TTimeout } from "@types";
import { POLLING_INTERVAL } from "@utils/constants";
import { useCallback, useEffect, useRef } from "react";

export type TUsePollingArgs = {
  callback: () => Promise<void>;
  isEnabled?: boolean;
  interval?: number;
};

export const usePolling = ({
  callback,
  isEnabled = true,
  interval = POLLING_INTERVAL,
}: TUsePollingArgs) => {
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

    if (isEnabled) {
      polling();
    } else {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    }

    return () => {
      mountedRef.current = false;
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [polling, isEnabled]);
};
