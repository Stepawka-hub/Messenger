import { Button } from "@ui/button";
import { NavLink } from "react-router-dom";
import { FC } from "react";

import { UserCardProps } from "./type";
import s from "./user-card.module.css";
import avatar from "@images/black.png";

export const UserCard: FC<UserCardProps> = ({
  user,
  followToUser,
  unfollowFromUser,
  followingInProgress,
}) => {
  const { id, name, status, location, photos, followed } = user;
  const follow = () => followToUser(id);
  const unfollow = () => unfollowFromUser(id);

  return (
    <article className={s.card}>
      <header className={s.header}>
        <div className={s.avatarWrapper}>
          <NavLink to={`/profile/${id}`}>
            <img
              className={s.avatar}
              src={photos?.small ?? avatar}
              alt="Avatar"
            />
          </NavLink>
        </div>
        <Button
          children={followed ? "Unfollowed" : "Follow"}
          className={s.button}
          disabled={followingInProgress}
          onClick={followed ? unfollow : follow}
        />
      </header>

      <div className={s.info}>
        <div className={s.description}>
          <h3 className={s.name}>{name}</h3>
          <p className={s.status}>{status || "There is no description..."}</p>
        </div>

        <div className={s.location}>
          <span className={s.country}>{location.country}</span>
          <span className={s.city}>{location.city}</span>
        </div>
      </div>
    </article>
  );
}; 
