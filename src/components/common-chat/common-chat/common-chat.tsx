import { FC, useRef } from "react";
import { MessageList, SendMessageFormWrapper } from "@components/common-chat";
import { ChatWrapper } from "@ui/chat-wrapper";

export const CommonChat: FC = () => {
  const bottomListRef = useRef<HTMLDivElement>(null);

  return (
    <ChatWrapper
      body={<MessageList bottomListRef={bottomListRef} />}
      footer={<SendMessageFormWrapper />}
    />
  );
};
