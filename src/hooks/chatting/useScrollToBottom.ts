import { MessagesContainerRef } from "@components/chat/messages-container";
import { useCallback, useRef } from "react";

export const useScrollToBottom = () => {
  const messagesContainerRef = useRef<MessagesContainerRef>(null);

  const scrollToBottom = useCallback(() => {
    messagesContainerRef.current?.scrollToBottom();
  }, [messagesContainerRef]);

  return { messagesContainerRef, scrollToBottom };
};
