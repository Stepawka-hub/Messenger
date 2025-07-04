import { StartDialogButton } from "@components/dialogs";
import {
  ProfileAvatar,
  ProfileContacts,
  ProfileData,
  ProfileEditForm,
} from "@components/profile";
import { useProfileEdit } from "@hooks/useProfileEdit";
import { Button } from "@ui/button";
import { FC } from "react";
import s from "./profile-info.module.css";
import { ProfileInfoProps } from "./type";

export const ProfileInfo: FC<ProfileInfoProps> = ({ id, isOwner, profile }) => {
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
              error={""}
              onSubmit={onSubmit}
              onCancel={deactivateEditMode}
            />
          ) : (
            <ProfileData isOwner={isOwner} profile={profile} />
          )}
        </div>
        <div className={s.actions}>
          {isOwner && !editMode && (
            <Button
              className={s.editBtn}
              disabled={isUpdatingProfile}
              onClick={activateEditMode}
            >
              {isUpdatingProfile ? "Сохранение..." : "Редактировать профиль"}
            </Button>
          )}
          {!isOwner && <StartDialogButton userId={id} />}
        </div>
      </div>

      {!editMode && <ProfileContacts contacts={profile.contacts} />}
    </div>
  );
};
