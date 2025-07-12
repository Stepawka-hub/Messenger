import { Avatar } from "@ui/avatar";
import clsx from "clsx";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./dialog.module.css";
import { DialogProps } from "./type";
import { Counter } from "@ui/counter";

export const Dialog: FC<DialogProps> = ({
  id,
  userName,
  photos,
  lastDialogActivityDate,
  newMessagesCount,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = `/dialogs/${id}`;
  const isActive = location.pathname === path;

  const handleClick = () => {
    navigate(path);
  };

  return (
    <article
      className={clsx(s.dialog, { [s.active]: isActive })}
      role="link"
      tabIndex={0}
      aria-label={`Перейти к диалогу с ${userName}`}
      title={`Перейти к диалогу с ${userName}`}
      onClick={handleClick}
    >
      <div className={s.content}>
        <div className={s.userInfoContainer}>
          <Avatar image={photos.small} size="small" />
          <div className={s.userInfo}>
            <span className={s.userName}>{userName}</span>
            <span className={s.lastActivity}>{lastDialogActivityDate}</span>
          </div>
        </div>
        <Counter count={newMessagesCount + 0} />
      </div>
    </article>
  );
};
