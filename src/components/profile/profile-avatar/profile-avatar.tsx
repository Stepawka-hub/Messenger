import { useDispatch } from "@store";
import { updateProfilePhotoAsync } from "@thunks/profile";
import { InputFile } from "@ui/form-elements/input-file";
import { ChangeEvent, FC } from "react";
import s from "./profile-avatar.module.css";
import { ProfileAvatarProps } from "./type";
import { getIsUpdatingPhoto } from "@slices/profile";
import { useSelector } from "react-redux";
import { Avatar } from "@ui/avatar";
import { CameraIcon } from "@icons";
import { Loader } from "@ui/loader";
import clsx from "clsx";

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
    <div className={s.container}>
      <Avatar image={photos.large} size="large" />
      {isOwner && (
        <InputFile
          className={clsx(s.inputPhoto, { [s.disabled]: isUpdating })}
          disabled={isUpdating}
          onChange={onChange}
        >
          <span className={s.iconWrapper}>
            {isUpdating ? (
              <Loader size={64} classes={{ loader: s.loader }} />
            ) : (
              <CameraIcon />
            )}
          </span>
        </InputFile>
      )}
    </div>
  );
};
