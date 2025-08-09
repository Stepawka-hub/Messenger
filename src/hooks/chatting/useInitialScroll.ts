import { useEffect, useRef } from "react";

type TUseInitialScrollArgs = {
  dataLength: number;
  chatId?: number;
  scrollToBottom: () => void;
};

export const useInitialScroll = ({
  dataLength,
  scrollToBottom,
  chatId,
}: TUseInitialScrollArgs) => {
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current && dataLength > 0) {
      scrollToBottom();
      isFirstLoad.current = false;
    }
  }, [isFirstLoad, dataLength, scrollToBottom]);

  useEffect(() => {
    isFirstLoad.current = true;
  }, [chatId]);
};
