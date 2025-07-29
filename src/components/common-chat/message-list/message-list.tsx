import { getCurrentUser } from "@slices/auth";
import { getMessages } from "@slices/common-chat";
import { useSelector } from "@store";
import { Message } from "@ui/message";
import { FC, useEffect } from "react";
import { MessageListProps } from "./types";
import { MessagesContainer } from "@components/chat";
import { useScrollToBottom } from '@hooks';

export const MessageList: FC<MessageListProps> = ({ bottomListRef }) => {
  const messages = useSelector(getMessages);
  const currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    const bottomRef = bottomListRef.current;
    if (bottomRef) {
      bottomRef.scrollIntoView({
        block: "nearest",
      });
    }
  }, [messages, bottomListRef]);

  useScrollToBottom({ bottomListRef, deps: [messages] });

  const messageElements = messages.map(
    ({ userId, userName, message, photo }, key) => (
      <Message
        key={key}
        senderId={userId}
        username={userName}
        content={message}
        photo={photo}
        isOwnMessage={currentUser?.id === userId}
        hideInfo
      />
    )
  );

  return (
    <MessagesContainer
      messages={messageElements}
      bottomListRef={bottomListRef}
    />
  );
};
