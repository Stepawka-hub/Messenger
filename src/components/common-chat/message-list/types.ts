import { RefObject } from "react";
import { MessagesContainerRef } from "@components/chat";
import { TSocketStatus } from "@types";

export type MessageListProps = {
  status: TSocketStatus;
  messagesContainerRef: RefObject<MessagesContainerRef | null>;
  scrollToBottom: () => void;
};
