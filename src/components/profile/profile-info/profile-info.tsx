import { FC } from "react";

import { Button } from "@components/common/button";
import { useSelector } from "@store";
import { ProfileAvatar } from "../profile-avatar";
import { ProfileContacts } from "../profile-contacts";
import { ProfileData } from "../profile-data";
import { ProfileInfoProps } from "./type";

import {
  useProfileEdit,
  useProfilePhoto,
  useProfileStatus,
} from "@hooks/profile";
import { getIsUpdatingPhoto, getProfileStatus } from "@slices/profile";
import s from "./profile-info.module.css";

export const ProfileInfo: FC<ProfileInfoProps> = ({ isOwner, profile }) => {
  const { id, photos } = profile;
  const status = useSelector(getProfileStatus);
  const isUpdatingPhoto = useSelector(getIsUpdatingPhoto);

  const { editMode, activateEditMode, deactivateEditMode } = useProfileEdit(
    id,
    isOwner
  );
  const { onUpdatePhoto } = useProfilePhoto(isOwner);
  const { updateStatus } = useProfileStatus();

  return (
    <div className={s.container}>
      <div className={s.info}>
        <div className={s.details}>
          <ProfileAvatar
            isOwner={isOwner}
            photos={photos}
            isUpdating={isUpdatingPhoto}
            onUpdatePhoto={onUpdatePhoto}
          />

          {editMode ? (
            // <ProfileEditForm
            //   profile={profile}
            //   ref={formRef}
            //   onSubmit={onSubmit}
            //   initialValues={initialValues}
            // />
            <></>
          ) : (
            <ProfileData
              isOwner={isOwner}
              profile={profile}
              status={status}
              updateUserStatus={updateStatus}
            />
          )}
        </div>

        <div>
          {isOwner && (
            <Button
              className={s.editBtn}
              children={editMode ? "Сохранить" : "Редактировать профиль"}
              onClick={editMode ? activateEditMode : activateEditMode}
            />
          )}
          {editMode && (
            <Button
              className={s.cancelBtn}
              children="Отменить"
              onClick={deactivateEditMode}
            />
          )}
        </div>
      </div>

      {!editMode && <ProfileContacts contacts={profile.contacts} />}
    </div>
  );
};
