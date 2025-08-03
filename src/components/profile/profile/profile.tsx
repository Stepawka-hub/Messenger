import { FC } from "react";
import { useSelector } from "@store";
import { getIsAuth } from "@slices/auth";
import { ProfileProps } from "./type";
import {
  ProfileAvatar,
  ProfileContacts,
  ProfileData,
  ProfileActions,
} from "@components/profile";
import s from "./profile.module.css";

export const Profile: FC<ProfileProps> = ({ id, isOwner, profile }) => {
  const isAuth = useSelector(getIsAuth);

  return (
    <div className={s.container}>
      <div className={s.userInfo}>
        <div className={s.details}>
          <ProfileAvatar isOwner={isOwner} photos={profile.photos} />
          <ProfileData isOwner={isOwner} profile={profile} />
        </div>

        {isAuth && (
          <div className={s.actions}>
            <ProfileActions userId={id} isOwner={isOwner} profile={profile} />
          </div>
        )}
      </div>

      <ProfileContacts contacts={profile.contacts} />
    </div>
  );
};
