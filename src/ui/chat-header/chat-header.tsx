import { CrossIcon } from "@icons";
import { Avatar } from "@ui/avatar";
import { TimeDisplay } from "@ui/time-display";
import { convertTZ, formatDateFull } from "@utils/helpers/date";
import { FC, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./chat-header.module.css";
import { ChatHeaderProps } from "./types";
import { IconButton } from '@ui/icon-button';

export const ChatHeader: FC<ChatHeaderProps> = ({
  userId,
  avatar = null,
  username,
  lastUserActivityDate,
}) => {
  const navigate = useNavigate();
  const onClickBackButton = () => {
    navigate("/dialogs");
  };

  const formatLastActivityTime = useCallback(() => {
    const lastUserActivityDateTZ = convertTZ(lastUserActivityDate);
    return `Последняя активность: ${formatDateFull(lastUserActivityDateTZ)}`;
  }, [lastUserActivityDate]);

  return (
    <header className={s.header}>
      <div className={s.content}>
        <div className={s.actions}>
          <IconButton
            aria-label="Закрыть"
            title="Закрыть"
            extraClass={s.backButton}
            onClick={onClickBackButton}
          >
            <CrossIcon className={s.closeIcon} />
          </IconButton>
        </div>
        <NavLink className={s.userInfo} to={`/profile/${userId}`}>
          <Avatar image={avatar} size="small" />
          <div className={s.userInfoContainer}>
            <span className={s.userName}>{username}</span>
            <TimeDisplay
              className={s.userLastSeen}
              timeFn={formatLastActivityTime}
            />
          </div>
        </NavLink>
      </div>
    </header>
  );
};
