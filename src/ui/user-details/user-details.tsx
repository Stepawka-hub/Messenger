import { FC } from "react";
import { Avatar } from "@ui/avatar";
import { UserDetailsProps } from "./type";
import s from "./user-details.module.css";

export const UserDetails: FC<UserDetailsProps> = ({
  username,
  email,
  photos,
  onAvatarClick,
}) => (
  <div className={s.userDetails}>
    <Avatar
      className={s.avatar}
      image={photos.small}
      size="small"
      onClick={onAvatarClick}
    />
    <div>
      <h4 className={s.username}>{username}</h4>
      <p className={s.email}>{email}</p>
    </div>
  </div>
);
