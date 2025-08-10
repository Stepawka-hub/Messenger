import { useCallback, useRef } from "react";
import { TMessagesContainerRef } from "@components/chat";

export const useScrollToBottom = () => {
  const messagesContainerRef = useRef<TMessagesContainerRef>(null);

  const scrollToBottom = useCallback(() => {
    messagesContainerRef.current?.scrollToBottom();
  }, []);

  return { messagesContainerRef, scrollToBottom };
};
