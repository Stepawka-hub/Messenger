import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import { MessageProps } from "./type";
import { MessageInfo } from "./message-info";
import { Avatar } from "@ui/avatar";
import clsx from "clsx";
import s from "./message.module.css";

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
    hideUserInfo = false,
    hideMessageInfo = false,
    openContextMenu,
  }) => {
    return (
      <article
        className={clsx(s.message, { [s.own]: isOwnMessage && isMobile })}
        onClick={isMobile ? openContextMenu : undefined}
        onContextMenu={openContextMenu}
      >
        <div className={s.userInfo}>
          {!hideUserInfo && (
            <NavLink to={`/profile/${senderId}`}>
              <Avatar image={photo} size="small" />
            </NavLink>
          )}
          <div className={s.content}>
            {!hideUserInfo && <h4 className={s.senderName}>{username}</h4>}
            <span className={s.text}>{content}</span>
          </div>
        </div>

        {!hideMessageInfo && (
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
