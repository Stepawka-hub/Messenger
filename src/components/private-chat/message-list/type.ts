import { TMessagesContainer } from "@components/chat";
import { TUserId } from "@types";

export type MessageListProps = {
  userId: TUserId;
  partnerAvatar: string | null;
  messagesContainerRef: TMessagesContainer;
};
