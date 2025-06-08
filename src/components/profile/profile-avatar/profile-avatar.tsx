import { InputFile } from "@components/common/input-file";
import avatar from "@images/black.png";
import { FC } from "react";
import s from "./profile-avatar.module.css";
import { ProfileAvatarProps } from "./type";

export const ProfileAvatar: FC<ProfileAvatarProps> = ({
  isOwner,
  photos,
  isUpdating,
  onUpdatePhoto,
}) => (
  <div className={s.avatarWrapper}>
    <img className={s.avatar} src={photos?.large || avatar} alt="Avatar" />
    {isOwner && (
      <InputFile
        className={s.updatePhoto}
        text="Сменить аватар"
        disabled={isUpdating}
        onChange={onUpdatePhoto}
      />
    )}
  </div>
);
