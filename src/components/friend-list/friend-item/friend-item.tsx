import { FC } from "react";
import s from "./friend-item.module.css";
import { FriendItemProps } from "./types";

export const FriendItem: FC<FriendItemProps> = ({ username, avatar }) => {
  const handleClick = () => {
    alert(`Не бойся меня, я твой друг - ${username}!`);
  };

  return (
    <article className={s.friend} onClick={handleClick}>
      <img src={avatar} className="avatar" alt="Avatar" />
      <span>{username}</span>
    </article>
  );
};
