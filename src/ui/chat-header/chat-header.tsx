import { Avatar } from "@ui/avatar";
import { Button } from "@ui/button";
import { FC } from "react";
import s from "./chat-header.module.css";
import { ChatHeaderProps } from "./types";
import { NavLink, useNavigate } from "react-router-dom";
import { CrossIcon } from "@icons";
import { convertTZ, getRelativeTimeString } from "@utils/helpers/date";

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

  const lastUserActivityDateTZ = convertTZ(lastUserActivityDate);
  const relativeTime = getRelativeTimeString(lastUserActivityDateTZ);

  return (
    <header className={s.header}>
      <div className={s.content}>
        <div className={s.actions}>
          <Button
            aria-label="Закрыть"
            title="Закрыть"
            className={s.backButton}
            onClick={onClickBackButton}
          >
            <CrossIcon className={s.closeIcon} />
          </Button>
        </div>
        <NavLink className={s.userInfo} to={`/profile/${userId}`}>
          <Avatar image={avatar} size="small" />
          <div className={s.userInfoContainer}>
            <span className={s.userName}>{username}</span>
            <span
              className={s.userLastSeen}
            >{`Последняя активность: ${relativeTime}`}</span>
          </div>
        </NavLink>
      </div>
    </header>
  );
};
