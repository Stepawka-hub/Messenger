import { Avatar } from "@ui/avatar";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import s from "./message.module.css";
import { MessageProps } from "./type";

export const Message: FC<MessageProps> = ({
  senderId,
  photo = null,
  username,
  content,
}) => (
  <article className={s.message}>
    <NavLink to={`/profile/${senderId}`}>
      <Avatar className={s.avatar} image={photo} size="small" />
    </NavLink>
    <div className={s.content}>
      <h4 className={s.author}>{username}</h4>
      <span className={s.text}>{content}</span>
    </div>
  </article>
);
