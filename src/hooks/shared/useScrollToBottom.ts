import { RefObject, useCallback } from "react";

export const useScrollToBottom = (
  bottomListRef: RefObject<HTMLDivElement | null>
) => {
  const scrollToBottom = useCallback(() => {
    const bottomRef = bottomListRef.current;
    if (bottomRef) {
      bottomRef.scrollIntoView({
        block: "nearest",
      });
    }
  }, [bottomListRef]);

  return scrollToBottom;
};
