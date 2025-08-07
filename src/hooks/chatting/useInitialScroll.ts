import { ScrollController } from "@types";
import { useEffect, useRef } from "react";

type TUseInitialScrollArgs<T extends unknown[]> = Pick<
  ScrollController,
  "scrollToBottom"
> & {
  elements: T;
  chatId?: number;
};

export const useInitialScroll = <T extends unknown[]>({
  elements,
  scrollToBottom,
  chatId,
}: TUseInitialScrollArgs<T>) => {
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current && elements.length > 0) {
      scrollToBottom();
      isFirstLoad.current = false;
    }
  }, [isFirstLoad, elements, scrollToBottom]);

  useEffect(() => {
    isFirstLoad.current = true;
  }, [chatId]);
};
