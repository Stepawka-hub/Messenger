import { InputFile } from "@ui/form-elements/input-file";
import avatar from "@images/black.png";
import { ChangeEvent, FC } from "react";
import s from "./profile-avatar.module.css";
import { ProfileAvatarProps } from "./type";

export const ProfileAvatar: FC<ProfileAvatarProps> = ({
  isOwner,
  photos,
  isUpdating,
  onUpdatePhoto,
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      onUpdatePhoto(files[0]);
    }
  };

  return (
    <div className={s.avatarWrapper}>
      <img className={s.avatar} src={photos?.large || avatar} alt="Avatar" />
      {!isOwner && (
        <InputFile
          className={s.updatePhoto}
          text="Сменить аватар"
          disabled={isUpdating}
          onChange={onChange}
        />
      )}
    </div>
  );
};
