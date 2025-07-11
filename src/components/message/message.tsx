import { Avatar } from "@ui/avatar";
import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import s from "./message.module.css";
import { MessageProps } from "./type";
import clsx from "clsx";

export const Message: FC<MessageProps> = memo(
  ({
    senderId,
    photo = null,
    username,
    content,
    isOwnMessage = false,
    isMobile = false,
  }) => {
    return (
      <article
        className={clsx(s.message, { [s.own]: isOwnMessage && isMobile })}
      >
        {!isMobile && (
          <NavLink to={`/profile/${senderId}`}>
            <Avatar className={s.avatar} image={photo} size="small" />
          </NavLink>
        )}
        <div className={s.content}>
          {!isMobile && <h4 className={s.sender}>{username}</h4>}
          <span className={s.text}>{content}</span>
        </div>
      </article>
    );
  }
);
