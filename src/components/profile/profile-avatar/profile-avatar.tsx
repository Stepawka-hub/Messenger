import avatar from "@images/black.png";
import { useDispatch } from "@store";
import { updateProfilePhotoAsync } from "@thunks/profile";
import { InputFile } from "@ui/form-elements/input-file";
import { ChangeEvent, FC } from "react";
import s from "./profile-avatar.module.css";
import { ProfileAvatarProps } from "./type";
import { getIsUpdatingPhoto } from "@slices/profile";
import { useSelector } from "react-redux";

export const ProfileAvatar: FC<ProfileAvatarProps> = ({ isOwner, photos }) => {
  const dispatch = useDispatch();
  const isUpdating = useSelector(getIsUpdatingPhoto);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isOwner) return;
    const files = e.target.files;
    if (files) {
      dispatch(updateProfilePhotoAsync(files[0]));
    }
  };

  return (
    <div>
      <div className={s.avatarWrapper}>
        <img className={s.avatar} src={photos?.large || avatar} alt="Avatar" />
      </div>
      <div>
        {isOwner && (
          <InputFile
            className={s.updatePhoto}
            text="Сменить аватар"
            disabled={isUpdating}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};
