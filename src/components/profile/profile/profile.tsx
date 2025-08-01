import { FC } from "react";
import { useSelector } from "@store";
import { getIsAuth } from "@slices/auth";
import { useModal, useProfileEdit } from "@hooks";
import { ProfileProps } from "./type";
import { StartDialogButton } from "@components/chat";
import {
  ProfileAvatar,
  ProfileContacts,
  ProfileData,
  ProfileEditForm,
} from "@components/profile";
import { Button } from "@ui/button";
import s from "./profile.module.css";

export const Profile: FC<ProfileProps> = ({ id, isOwner, profile }) => {
  const isAuth = useSelector(getIsAuth);
  const { initialValues, isUpdatingProfile, onSubmit } =
    useProfileEdit(profile);

  const { showModal, hideModal } = useModal();

  const handleClick = () => {
    showModal(
      <ProfileEditForm
        initialValue={initialValues}
        onSubmit={onSubmit}
        onCancel={hideModal}
      />
    );
  };

  return (
    <div className={s.container}>
      <div className={s.userInfo}>
        <div className={s.details}>
          <ProfileAvatar isOwner={isOwner} photos={profile.photos} />
          <ProfileData isOwner={isOwner} profile={profile} />
        </div>

        {isAuth && (
          <div className={s.actions}>
            {isOwner && (
              <Button
                className={s.button}
                disabled={isUpdatingProfile}
                onClick={handleClick}
              >
                {isUpdatingProfile ? "Сохранение..." : "Р"}
              </Button>
            )}
            {!isOwner && <StartDialogButton userId={id} />}
          </div>
        )}
      </div>

      <ProfileContacts contacts={profile.contacts} />
    </div>
  );
};
