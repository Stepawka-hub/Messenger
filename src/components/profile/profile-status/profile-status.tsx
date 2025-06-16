import { ChangeEvent, FC, useEffect, useState } from "react";
import s from "./profile-status.module.css";
import { ProfileStatusProps } from "./type";

export const ProfileStatus: FC<ProfileStatusProps> = ({
  isOwner,
  status,
  updateUserStatus,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [userStatus, setUserStatus] = useState(status);

  useEffect(() => {
    setUserStatus(status);
  }, [status]);

  const activateEditMode = () => {
    if (!isOwner) return;
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    updateUserStatus(userStatus);
  };

  const onStatusChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUserStatus(evt.currentTarget.value);
  };

  return (
    <div className={s.container}>
      {editMode ? (
        <input
          className={s.input}
          autoFocus
          value={userStatus}
          onChange={onStatusChange}
          onBlur={deactivateEditMode}
        />
      ) : (
        <span className={s.status} onClick={activateEditMode}>
          {userStatus || "Нет"}
        </span>
      )}
    </div>
  );
};
