import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { getIsUpdatingStatus, getProfileStatus } from "@slices/profile";
import { ProfileStatusForm } from "../profile-status-form";
import { ProfileStatusProps } from "./type";
import s from "./profile-status.module.css";
import clsx from "clsx";
import { Loader } from "@ui/loader";

export const ProfileStatus: FC<ProfileStatusProps> = ({ isOwner }) => {
  const status = useSelector(getProfileStatus);
  const isUpdatingStatus = useSelector(getIsUpdatingStatus);
  const [editMode, setEditMode] = useState(false);

  if (isUpdatingStatus) {
    return <Loader size={32} classes={{ container: s.loaderContainer }} />;
  }

  const activateEditMode = () => {
    if (!isOwner) return;
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
  };

  return (
    <div className={s.container}>
      {editMode ? (
        <ProfileStatusForm
          initialValue={status}
          callback={deactivateEditMode}
        />
      ) : (
        <span
          className={clsx(s.status, { [s.editable]: isOwner })}
          onClick={activateEditMode}
        >
          {status || "Нет"}
        </span>
      )}
    </div>
  );
};
