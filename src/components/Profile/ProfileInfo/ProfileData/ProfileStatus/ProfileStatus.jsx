import { useEffect, useState } from 'react';
import s from './ProfileStatus.module.css';

const ProfileStatus = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    if (!props.isOwner) return;

    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  }

  const onStatusChange = (evt) => {
    setStatus(evt.currentTarget.value);
  }

  return (
    <div className={s.status}>
      <span className={s.status__label}>
        {props.label}
      </span>
      {
        editMode ?
          <input
            autoFocus
            className={s.status__input}
            value={status}
            onChange={onStatusChange}
            onBlur={deactivateEditMode}
          />
          :
          <span onDoubleClick={activateEditMode}>
            {props.status || 'Нет'}
          </span>
      }
    </div>
  )
};

export default ProfileStatus;