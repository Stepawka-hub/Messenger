import { FC } from "react";
import { Avatar } from "@ui/avatar";
import { Counter } from "@ui/counter";
import { convertTZ, getRelativeTimeString } from "@utils/helpers/date";
import { useLocation, useNavigate } from "react-router-dom";
import { DialogProps } from "./type";
import s from "./dialog.module.css";
import clsx from "clsx";

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

  const lastDialogActivityDateTZ = convertTZ(lastDialogActivityDate);
  const relativeTime = getRelativeTimeString(lastDialogActivityDateTZ);

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
            <span className={s.lastActivity}>{relativeTime}</span>
          </div>
        </div>
        {!!newMessagesCount && <Counter count={newMessagesCount} />}
      </div>
    </article>
  );
};
