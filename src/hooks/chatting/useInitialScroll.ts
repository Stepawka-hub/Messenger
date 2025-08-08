import { ScrollController } from "@types";
import { useEffect, useRef } from "react";

type TUseInitialScrollArgs = Pick<ScrollController, "scrollToBottom"> & {
  dataLength: number;
  chatId?: number;
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
