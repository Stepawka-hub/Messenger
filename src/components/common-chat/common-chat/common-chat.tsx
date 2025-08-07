import { FC, useRef } from "react";
import { MessageList, SendMessageFormWrapper } from "@components/common-chat";
import { ChatWrapper } from "@ui/chat-wrapper";
import { useSelector } from "@store";
import { getStatus } from "@slices/common-chat";
import { useScrollToBottom } from "@hooks";

export const CommonChat: FC = () => {
  const status = useSelector(getStatus);
  const bottomListRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useScrollToBottom(bottomListRef);

  return (
    <ChatWrapper
      body={
        <MessageList
          status={status}
          bottomListRef={bottomListRef}
          scrollToBottom={scrollToBottom}
        />
      }
      footer={
        <SendMessageFormWrapper
          status={status}
          scrollToBottom={scrollToBottom}
        />
      }
    />
  );
};
