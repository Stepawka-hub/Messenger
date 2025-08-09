import { useCallback, useRef } from "react";
import { MessagesContainerRef } from "@components/chat";

export const useScrollToBottom = () => {
  const messagesContainerRef = useRef<MessagesContainerRef>(null);

  const scrollToBottom = useCallback(() => {
    messagesContainerRef.current?.scrollToBottom();
  }, []);

  return { messagesContainerRef, scrollToBottom };
};
