import { MessagesContainerRef } from "@components/chat/messages-container";
import { TUserId } from "@types";
import { RefObject } from "react";

export type MessageListProps = {
  userId: TUserId;
  partnerAvatar: string | null;
  messagesContainerRef: RefObject<MessagesContainerRef | null>;
};
