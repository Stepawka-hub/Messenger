import { Avatar } from "@ui/avatar";
import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import { MessageInfo } from "./message-info";
import { MessageProps } from "./type";
import s from "./message.module.css";
import clsx from "clsx";

export const Message: FC<MessageProps> = memo(
  ({
    senderId,
    photo = null,
    username,
    content,
    addedAt,
    isViewed = false,
    isOwnMessage = false,
    isMobile = false,
    hideInfo = false,
  }) => {
    return (
      <article
        className={clsx(s.message, { [s.own]: isOwnMessage && isMobile })}
      >
        <div className={s.userInfo}>
          {!isMobile && (
            <NavLink to={`/profile/${senderId}`}>
              <Avatar image={photo} size="small" />
            </NavLink>
          )}
          <div className={s.content}>
            {!isMobile && <h4 className={s.sender}>{username}</h4>}
            <span className={s.text}>{content}</span>
          </div>
        </div>
        {!hideInfo && (
          <MessageInfo
            addedAt={addedAt}
            isViewed={isViewed}
            isOwnMessage={isOwnMessage}
          />
        )}
      </article>
    );
  }
);
