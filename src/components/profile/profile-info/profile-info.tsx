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

export const ProfileInfo: FC<ProfileInfoProps> = ({ isOwner, profile }) => {
  const {
    initialValues,
    editMode,
    activateEditMode,
    deactivateEditMode,
    onSubmit,
  } = useProfileEdit(profile, isOwner);

  return (
    <div className={s.container}>
      <div className={s.info}>
        <div className={s.details}>
          <div className={s.avatar}>
            <ProfileAvatar isOwner={isOwner} photos={profile.photos} />
          </div>

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

        {isOwner && !editMode && (
          <Button
            className={s.editBtn}
            children={"Редактировать профиль"}
            onClick={activateEditMode}
          />
        )}
      </div>

      {!editMode && <ProfileContacts contacts={profile.contacts} />}
    </div>
  );
};
