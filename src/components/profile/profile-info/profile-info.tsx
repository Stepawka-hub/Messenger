import { FC } from "react";
import {
  ProfileAvatar,
  ProfileContacts,
  ProfileData,
  ProfileEditForm,
} from "@components/profile";
import { Button } from "@ui/button";
import { useProfileEdit } from "@hooks/useProfileEdit";
import { ProfileInfoProps } from "./type";
import { TProfileEditForm } from "../profile-edit-form/types";
import s from "./profile-info.module.css";

export const ProfileInfo: FC<ProfileInfoProps> = ({ isOwner, profile }) => {
  const { photos, contacts, ...rest } = profile;
  const initialValues: TProfileEditForm = {
    ...rest,
    ...contacts,
  };

  const { editMode, activateEditMode, deactivateEditMode, onSubmit } =
    useProfileEdit(profile, isOwner);

  return (
    <div className={s.container}>
      <div className={s.info}>
        <div className={s.details}>
          <div className={s.avatar}>
            <ProfileAvatar isOwner={isOwner} photos={photos} />
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
