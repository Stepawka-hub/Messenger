import { FC } from "react";
import { getCurrentUser } from "@slices/auth";
import { getMessages } from "@slices/common-chat";
import { useSelector } from "@store";
import { Message } from "@ui/message";
import { MessageListProps } from "./types";
import { MessagesContainer } from "@components/chat";
import { useMediaQuery } from "react-responsive";
import { Loader } from "@ui/loader";
import s from "./message-list.module.css";

export const MessageList: FC<MessageListProps> = ({ status, ...props }) => {
  const messages = useSelector(getMessages);
  const currentUser = useSelector(getCurrentUser);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (status !== "ready") {
    return <Loader classes={{ container: s.loaderContainer }} />;
  }

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

  return <MessagesContainer messages={messageElements} {...props} />;
};
