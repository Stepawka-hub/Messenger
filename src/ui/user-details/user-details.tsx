import { FC } from "react";
import { Avatar } from "@ui/avatar";
import { UserDetailsProps } from "./type";
import s from "./user-details.module.css";
import { NavLink } from "react-router-dom";

export const UserDetails: FC<UserDetailsProps> = ({
  username,
  email,
  photos,
  linkPath,
}) => (
  <div className={s.userDetails}>
    <NavLink className={s.avatarLink} to={linkPath}>
      <Avatar image={photos?.small || null} size="small" />
    </NavLink>
    <div className={s.userInfo}>
      <h3 className={s.username}>{username}</h3>
      <p className={s.email}>{email}</p>
    </div>
  </div>
);
