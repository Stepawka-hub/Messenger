import { FC } from "react";
import { useSelector } from "@store";
import { getIsAuth } from "@slices/auth";
import { useProfileEdit } from "@hooks";
import { ProfileInfoProps } from "./type";
import { StartDialogButton } from "@components/chat";
import {
  ProfileAvatar,
  ProfileContacts,
  ProfileData,
  ProfileEditForm,
} from "@components/profile";
import { Button } from "@ui/button";
import s from "./profile-info.module.css";

export const ProfileInfo: FC<ProfileInfoProps> = ({ id, isOwner, profile }) => {
  const isAuth = useSelector(getIsAuth);
  const {
    initialValues,
    isUpdatingProfile,
    editMode,
    activateEditMode,
    deactivateEditMode,
    onSubmit,
  } = useProfileEdit(profile, isOwner);

  return (
    <div className={s.container}>
      <div className={s.info}>
        <div className={s.details}>
          <ProfileAvatar isOwner={isOwner} photos={profile.photos} />

          {editMode ? (
            <ProfileEditForm
              initialValue={initialValues}
              onSubmit={onSubmit}
              onCancel={deactivateEditMode}
            />
          ) : (
            <ProfileData isOwner={isOwner} profile={profile} />
          )}
        </div>
        {isAuth && (
          <div className={s.actions}>
            {isOwner && !editMode && (
              <Button
                className={s.button}
                disabled={isUpdatingProfile}
                onClick={activateEditMode}
              >
                {isUpdatingProfile ? "Сохранение..." : "Редактировать профиль"}
              </Button>
            )}
            {!isOwner && <StartDialogButton userId={id} />}
          </div>
        )}
      </div>

      {!editMode && <ProfileContacts contacts={profile.contacts} />}
    </div>
  );
};
