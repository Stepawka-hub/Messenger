import { Avatar } from "@ui/avatar";
import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import s from "./message.module.css";
import { MessageProps } from "./type";
import clsx from "clsx";
import { CheckIcon, DoubleCheckIcon } from "@icons";

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
        <div className={s.messageInfo}>
          {addedAt && <span>{addedAt}</span>}
          {isViewed ? (
            <DoubleCheckIcon className={s.icon} size={16} />
          ) : (
            <CheckIcon className={s.icon} size={16} />
          )}
        </div>
      </article>
    );
  }
);
