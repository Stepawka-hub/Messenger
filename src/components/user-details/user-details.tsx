import { FC } from "react";

import avatarDefault from "@images/black.png";
import { UserDetailsProps } from "./type";
import s from "./user-details.module.css";

export const UserDetails: FC<UserDetailsProps> = ({
  username,
  email,
  photos,
  onAvatarClick,
}) => (
  <div className={s.userDetails}>
    <div className={s.avatarWrapper} onClick={onAvatarClick}>
      <img
        src={photos?.small || avatarDefault}
        className="avatar"
        alt="Avatar"
      />
    </div>
    <div>
      <h4 className={s.username}>{username}</h4>
      <p className={s.email}>{email}</p>
    </div>
  </div>
);
