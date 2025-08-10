import { useEffect, useRef } from "react";

type TUseInitialScrollArgs = {
  dataLength: number;
  resetDep?: unknown;
  scrollToBottom: () => void;
};

export const useInitialScroll = ({
  dataLength,
  resetDep,
  scrollToBottom,
}: TUseInitialScrollArgs) => {
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current && dataLength) {
      scrollToBottom();
      isFirstLoad.current = false;
    }
  }, [isFirstLoad, dataLength, scrollToBottom]);

  useEffect(() => {
    isFirstLoad.current = true;
  }, [resetDep]);
};
