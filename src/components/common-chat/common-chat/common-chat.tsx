import { FC, useRef } from "react";
import { MessageList, SendMessageFormWrapper } from "@components/common-chat";
import { ChatWrapper } from "@ui/chat-wrapper";
import { useSelector } from "@store";
import { getStatus } from "@slices/common-chat";

export const CommonChat: FC = () => {
  const status = useSelector(getStatus);
  const bottomListRef = useRef<HTMLDivElement>(null);

  return (
    <ChatWrapper
      body={<MessageList status={status} bottomListRef={bottomListRef} />}
      footer={<SendMessageFormWrapper status={status} />}
    />
  );
};
