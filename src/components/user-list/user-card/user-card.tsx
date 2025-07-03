import { Button } from "@ui/button";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from "@ui/avatar";
import { UserCardProps } from "./type";
import s from "./user-card.module.css";
import clsx from "clsx";

export const UserCard: FC<UserCardProps> = ({
  user,
  isCurrentUser,
  followingInProgress,
  followToUser,
  unfollowFromUser,
}) => {
  const { id, name, status, photos, followed } = user;
  const follow = () => followToUser(id);
  const unfollow = () => unfollowFromUser(id);

  return (
    <article className={s.card}>
      <header className={s.header}>
        <NavLink to={`/profile/${id}`}>
          <Avatar image={photos.small} size="medium" />
        </NavLink>
      </header>

      <div className={s.info}>
        <div className={s.description}>
          <h3 className={s.name}>{name}</h3>
          <p className={s.status}>{status || "There is no description..."}</p>
        </div>
        <div className={s.actions}>
          {!isCurrentUser && (
            <Button
              className={clsx(s.followBtn, { [s.followed]: followed })}
              disabled={followingInProgress}
              onClick={followed ? unfollow : follow}
            >
              {followed ? "Отписаться" : "Подписаться"}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};
