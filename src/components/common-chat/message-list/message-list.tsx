import { getCurrentUser } from "@slices/auth";
import { getMessages } from "@slices/common-chat";
import { useSelector } from "@store";
import { Message } from "@ui/message";
import { FC, useEffect } from "react";
import { MessageListProps } from "./types";
import { MessagesContainer } from "@components/chat";
import { useScrollToBottom } from "@hooks";
import { useMediaQuery } from "react-responsive";

export const MessageList: FC<MessageListProps> = ({ bottomListRef }) => {
  const messages = useSelector(getMessages);
  const currentUser = useSelector(getCurrentUser);
  const isMobile = useMediaQuery({ maxWidth: 760 });

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
    ({ userId, userName, message, photo }, key) => {
      const isMessageOwner = currentUser?.id === userId;
      return (
        <Message
          key={key}
          senderId={userId}
          username={userName}
          content={message}
          photo={photo}
          isMobile={isMobile}
          isOwnMessage={isMessageOwner}
          hideUserInfo={isMessageOwner && isMobile}
          hideMessageInfo
        />
      );
    }
  );

  return (
    <MessagesContainer
      messages={messageElements}
      bottomListRef={bottomListRef}
    />
  );
};
