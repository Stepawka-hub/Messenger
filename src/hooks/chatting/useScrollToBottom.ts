import { TMessage, TUserId } from '@types';
import { RefObject, useEffect, useState } from "react";

type TUseScrollToBottomParams = {
  userId: TUserId;
  messages: TMessage[];
  bottomListRef: RefObject<HTMLDivElement | null>;
};

export const useScrollToBottom = ({
  userId,
  messages,
  bottomListRef,
}: TUseScrollToBottomParams) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const bottomRef = bottomListRef.current;
    if (bottomRef && messages.length > 0 && isFirstLoad) {
      bottomRef.scrollIntoView({
        block: "nearest",
      });
      setIsFirstLoad(false);
    }
  }, [messages, isFirstLoad, bottomListRef]);

  useEffect(() => {
    setIsFirstLoad(true);
  }, [userId]);
};
