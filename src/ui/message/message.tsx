import { FC } from "react";
import s from "./message.module.css";
import { MessageProps } from "./type";

export const Message: FC<MessageProps> = ({ photo, username, content }) => {
  return (
    <article className={s.message}>
      <div>
        <img className="avatar" src={photo} alt="Avatar" />
      </div>
      <div className={s.messageContent}>
        <h4 className={s.author}>{username}</h4>
        <span className={s.text}>{content}</span>
      </div>
    </article>
  );
};
