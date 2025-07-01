import { useSelector } from "@store";
import { FC } from "react";
import { getMessages } from "@slices/chat";
import { Message } from "@ui/message";
import s from "./message-list.module.css";

export const MessageList: FC = () => {
  const messages = useSelector(getMessages);

  return (
    <section className={s.list}>
      {messages.map(({ id, photo, userName, message }) => (
        <Message key={id} photo={photo} username={userName} content={message} />
      ))}
    </section>
  );
};
