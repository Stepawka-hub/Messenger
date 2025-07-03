import { Message } from "@ui/message";
import { FC } from "react";
import s from "./message-list.module.css";
import { MessageListProps } from "./type";

export const MessageList: FC<MessageListProps> = ({ messages }) => {
  return (
    <section className={s.list}>
      {messages.map(({ id, body, senderName }) => (
        <Message key={id} photo={''} username={senderName} content={body} />
      ))}
    </section>
  );
};
