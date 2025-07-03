import { Message } from "@components/common-chat";
import { FC } from "react";
import s from "./message-list.module.css";
import { MessageListProps } from "./type";

export const MessageList: FC<MessageListProps> = ({ messages }) => (
  <section className={s.list}>
    {messages.map(({ id, userName, message, photo }) => (
      <Message key={id} photo={photo} username={userName} content={message} />
    ))}
  </section>
);
