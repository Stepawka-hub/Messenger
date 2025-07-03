import { FC } from "react";
import s from "./message.module.css";
import { MessageProps } from "./type";
import { Avatar } from "@ui/avatar";

export const Message: FC<MessageProps> = ({ photo, username, content }) => (
  <article className={s.message}>
    <Avatar image={photo} size="small" />
    <div className={s.content}>
      <h4 className={s.author}>{username}</h4>
      <span className={s.text}>{content}</span>
    </div>
  </article>
);
