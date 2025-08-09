import { TMessagesContainer } from "@components/chat";
import { TSocketStatus } from "@types";

export type MessageListProps = {
  status: TSocketStatus;
  messagesContainerRef: TMessagesContainer;
};
