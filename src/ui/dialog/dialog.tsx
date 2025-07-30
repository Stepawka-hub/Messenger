import { FC, useCallback } from "react";
import { Avatar } from "@ui/avatar";
import { Counter } from "@ui/counter";
import { TimeDisplay } from "@ui/time-display";
import { convertTZ, getRelativeTimeString } from "@utils/helpers/date";
import { differenceInMinutes } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import { DialogProps } from "./type";
import clsx from "clsx";
import s from "./dialog.module.css";

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
  const getRelativeTime = useCallback(
    () =>
      differenceInMinutes(Date.now(), lastDialogActivityDateTZ) < 1
        ? "Только что"
        : getRelativeTimeString(lastDialogActivityDateTZ),
    [lastDialogActivityDateTZ]
  );

  const handleClick = () => {
    navigate(path);
  };

  return (
    <article
      className={clsx(s.dialog, {
        [s.active]: isActive,
      })}
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
            <TimeDisplay
              className={s.lastDialogActivity}
              timeFn={getRelativeTime}
            />
          </div>
        </div>
        {!!newMessagesCount && <Counter count={newMessagesCount} />}
      </div>
    </article>
  );
};
