import clsx from "clsx";
import { ChangeEvent, FC, useEffect, useState } from "react";
import s from "./profile-status.module.css";
import { ProfileStatusProps } from "./type";
import { getProfileStatus } from "@slices/profile";
import { useSelector } from "react-redux";
import { updateProfileStatusAsync } from "@thunks/profile";
import { useDispatch } from "@store";

export const ProfileStatus: FC<ProfileStatusProps> = ({ isOwner }) => {
  const dispatch = useDispatch();
  const status = useSelector(getProfileStatus);
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
    dispatch(updateProfileStatusAsync(userStatus));
  };

  const onStatusChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUserStatus(evt.currentTarget.value);
  };

  return (
    <div className={s.container}>
      {editMode ? (
        <input
          id="user-status"
          name="user-status"
          className={s.input}
          autoFocus
          value={userStatus}
          onChange={onStatusChange}
          onBlur={deactivateEditMode}
        />
      ) : (
        <span
          className={clsx(s.status, { [s.editable]: isOwner })}
          onClick={activateEditMode}
        >
          {userStatus || "Нет"}
        </span>
      )}
    </div>
  );
};
