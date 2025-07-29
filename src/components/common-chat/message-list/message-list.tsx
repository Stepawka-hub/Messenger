import { FC } from "react";
import { getCurrentUser } from "@slices/auth";
import { getMessages } from "@slices/chat";
import { useSelector } from "@store";
import { TCommonChatMessage } from "@types";
import { List } from "@ui/list";
import { Message } from "@ui/message";
import s from "./chat-message-list.module.css";

export const MessageList: FC = () => {
  const messages = useSelector(getMessages);
  const currentUser = useSelector(getCurrentUser);

  const renderMessage = (
    { userId, userName, message, photo }: TCommonChatMessage,
    key?: number
  ) => (
    <Message
      key={key}
      senderId={userId}
      username={userName}
      content={message}
      photo={photo}
      isOwnMessage={currentUser?.id === userId}
      hideInfo
    />
  );

  return (
    <List
      items={messages}
      renderItem={renderMessage}
      emptyMessage="Список сообщений пуст"
      classes={{ list: s.list }}
    />
  );
};
