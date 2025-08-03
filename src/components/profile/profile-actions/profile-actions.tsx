import { FC } from "react";
import { StartDialogButton } from "@components/chat";
import { useProfileForm } from "@hooks";
import { Button } from "@ui/button";
import { ProfileActionsProps } from "./types";
import s from "./profile-actions.module.css";

export const ProfileActions: FC<ProfileActionsProps> = ({
  userId,
  isOwner,
  profile,
}) => {
  const { openEditForm, isUpdatingProfile } = useProfileForm(profile);

  return (
    <>
      {isOwner && (
        <Button
          className={s.button}
          disabled={isUpdatingProfile}
          onClick={openEditForm}
        >
          {isUpdatingProfile ? "Сохранение..." : "Редактировать"}
        </Button>
      )}
      {!isOwner && <StartDialogButton userId={userId} />}
    </>
  );
};
