import { RefObject, useEffect } from "react";

type TUseScrollToBottomParams = {
  deps?: unknown[];
  bottomListRef: RefObject<HTMLDivElement | null>;
};

export const useScrollToBottom = ({
  deps = [],
  bottomListRef,
}: TUseScrollToBottomParams) => {
  useEffect(() => {
    const bottomRef = bottomListRef.current;
    if (bottomRef) {
      bottomRef.scrollIntoView({
        block: "nearest",
      });
    }
  }, [bottomListRef]);
};
