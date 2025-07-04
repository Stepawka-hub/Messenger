import { Avatar } from "@ui/avatar";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { UserCardProps } from "./type";
import s from "./user-card.module.css";

export const UserCard: FC<UserCardProps> = ({ user, actions }) => {
  const { id, name, status, photos } = user;

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
        <div className={s.actions}>{actions}</div>
      </div>
    </article>
  );
};
