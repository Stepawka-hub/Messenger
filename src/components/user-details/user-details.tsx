import { FC } from "react";

import s from "./user-details.module.css";
import avatarDefault from "@images/black.png";
import { useSelector } from "@store";
import { getCurrentUser } from "@slices/auth";
import { userDefault } from "@utils/constants";

export const UserDetails: FC = () => {
  const { login, email, photos } = useSelector(getCurrentUser) || userDefault;

  return (
    <div className="user-details">
      <div className="user-details__avatar">
        <img
          src={photos?.small || avatarDefault}
          className="avatar"
          alt="Avatar"
        />
      </div>
      <div>
        <h4 className={s.login}>{login}</h4>
        <p className={s.email}>{email}</p>
      </div>
    </div>
  );
};
