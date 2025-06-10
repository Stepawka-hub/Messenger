import { FC } from "react";
import s from "./message.module.css";
import { MessageProps } from "./type";

export const Message: FC<MessageProps> = ({ message }) => {
  const { avatar, username, text } = message;
  return (
    <article className={s.message}>
      <div>
        <img className="avatar" src={avatar} alt="Avatar" />
      </div>
      <div>
        <h4 className={s.author}>{username}</h4>
        <span className={s.text}>{text}</span>
      </div>
    </article>
  );
};