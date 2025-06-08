import { FC } from "react";

import avatarDefault from "@images/black.png";
import { UserDetailsProps } from "./type";
import s from "./user-details.module.css";
import { useNavigate } from "react-router-dom";

export const UserDetails: FC<UserDetailsProps> = ({
  userId,
  username,
  email,
  photos,
}) => {
  const navigate = useNavigate();
  const handleAvatarClick = () => {
    navigate(`/profile/${userId}`);
  };
  
  return (
    <div className={s.userDetails}>
      <div className={s.avatarWrapper} onClick={handleAvatarClick}>
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
};
