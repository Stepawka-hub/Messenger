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
          <ProfileAvatar isOwner={isOwner} photos={photos} />

          {editMode ? (
            <ProfileEditForm
              initialValue={initialValues}
              error={""}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileData isOwner={isOwner} profile={profile} />
          )}
        </div>

        <div>
          {isOwner && (
            <Button
              className={s.editBtn}
              children={editMode ? "Сохранить" : "Редактировать профиль"}
              onClick={editMode ? deactivateEditMode : activateEditMode}
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
