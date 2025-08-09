import { FC } from "react";
import { MessageList, SendMessageFormWrapper } from "@components/common-chat";
import { ChatWrapper } from "@ui/chat-wrapper";
import { useSelector } from "@store";
import { getStatus } from "@slices/common-chat";
import { useScrollToBottom } from "@hooks";

export const CommonChat: FC = () => {
  const status = useSelector(getStatus);
  const { messagesContainerRef, scrollToBottom } = useScrollToBottom();

  return (
    <ChatWrapper
      body={
        <MessageList
          status={status}
          messagesContainerRef={messagesContainerRef}
        />
      }
      footer={
        <SendMessageFormWrapper
          status={status}
          onSentMessage={scrollToBottom}
        />
      }
    />
  );
};
