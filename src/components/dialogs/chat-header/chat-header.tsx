import { Avatar } from "@ui/avatar";
import { Button } from "@ui/button";
import { FC } from "react";
import s from "./chat-header.module.css";
import { ChatHeaderProps } from "./types";
import { NavLink, useNavigate } from "react-router-dom";
import { CrossIcon } from "@icons";

export const ChatHeader: FC<ChatHeaderProps> = ({
  userId,
  avatar = null,
  username = "Username",
}) => {
  const navigate = useNavigate();
  const onClickBackButton = () => {
    navigate("/dialogs");
  };

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
            <CrossIcon />
          </Button>
        </div>
        <NavLink className={s.userInfo} to={`/profile/${userId}`}>
          <div className={s.userInfoInner}>
            <Avatar image={avatar} size="small" />
            <span className={s.userName}>{username}</span>
          </div>
        </NavLink>
      </div>
    </header>
  );
};
