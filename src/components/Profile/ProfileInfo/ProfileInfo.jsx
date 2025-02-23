import { useState } from 'react';

import './ProfileInfo.css'
import avatar from '../../../assets/images/black.png';
import Loader from '../../common/Loader/Loader';
import InputFile from '../../common/InputFile/InputFile';
import ProfileData from './ProfileData/ProfileData';
import ProfileContacts from './ProfileContacts/ProfileContacts';
import Button from '../../common/Button/Button';

const ProfileInfo = ({ isOwner, profile, status, isUpdatingPhoto, updateUserStatus, updateUserPhoto }) => {
  const [editMode, setEditMode] = useState(false);

  if (!profile) return <Loader />

  const activateEditMode = () => {
    if (!isOwner) return;
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
  }

  const onSelectedPhoto = (evt) => {
    const photo = evt.target.files;

    if (photo.length) {
      updateUserPhoto(photo[0]);
    }
  }

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="profile-info__details">
          <div className="profile-info__avatar">
            <img src={profile?.photos?.large || avatar} alt="Avatar" />
            {isOwner &&
              <InputFile
                className='profile-info__update-photo'
                text='Сменить аватар'
                disabled={isUpdatingPhoto}
                callback={onSelectedPhoto}
              />}
          </div>

          {
            editMode ?
              <ProfileDataForm /> :
              <ProfileData
                isOwner={isOwner}
                profile={profile}
                status={status}
                updateUserStatus={updateUserStatus}
              />
          }
        </div>

        <div className='profile-info__edit'>
          <Button
            text={editMode ? 'Сохранить' : 'Редактировать профиль'}
            onClick={editMode ? deactivateEditMode : activateEditMode}
          />
        </div>
      </div>

      <div>
        {
          editMode ?
            <ProfileContactsForm /> :
            <ProfileContacts contacts={profile.contacts} />
        }
      </div>
    </div>
  );
}

const ProfileDataForm = () => {
  return (
    <></>
  )
}

const ProfileContactsForm = () => {
  return (
    <></>
  );
}

export default ProfileInfo;