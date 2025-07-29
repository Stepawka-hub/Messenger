import { getCurrentUser } from "@slices/auth";
import { getMessages } from "@slices/common-chat";
import { useSelector } from "@store";
import { TCommonChatMessage } from "@types";
import { Message } from "@ui/message";
import { NoDataFound } from "@ui/no-data-found";
import { FC, useEffect } from "react";
import { MessageListProps } from "./types";
import s from "./message-list.module.css";

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

  if (!messages.length) {
    return <NoDataFound label="Список сообщений пуст" className={s.noData} />;
  }

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
    <section className={s.list}>
      {messageElements}
      <div className={s.bottomList} ref={bottomListRef}></div>
    </section>
  );
};
