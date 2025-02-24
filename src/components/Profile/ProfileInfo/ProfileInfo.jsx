/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react';

import './ProfileInfo.css'
import avatar from '../../../assets/images/black.png';
import Loader from '../../common/Loader/Loader';
import InputFile from '../../common/InputFile/InputFile';
import ProfileData from './ProfileData/ProfileData';
import ProfileEditForm from './ProfileEditForm/ProfileEditForm';
import ProfileContacts from './ProfileContacts/ProfileContacts';
import Button from '../../common/Button/Button';

const ProfileInfo = ({ isOwner, profile, status, isUpdatingPhoto, ...props }) => {
  const [editMode, setEditMode] = useState(false);
  const editForm = useRef(null);

  const activateEditMode = () => {
    if (!isOwner) return;
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    if (!isOwner) return;
    setEditMode(false);
  }

  useEffect(() => {
    deactivateEditMode();
  }, [profile])

  if (!profile) return <Loader />

  const saveData = () => {
    if (editForm.current) {
      editForm.current.submit();
    }
  }

  const onSubmit = (formData) => {
    const {
      aboutMe, lookingForAJobDescription, fullName,
      github, vk, facebook, instagram, twitter
    } = formData;
    const lookingForAJob = formData.lookingForAJob.toLowerCase() === 'да';

    const data = {
      userId: profile.userId,
      aboutMe,
      fullName,
      lookingForAJob,
      lookingForAJobDescription,
      contacts: {
        github,
        vk,
        facebook,
        instagram,
        twitter,
        website: '',
        youtube: '',
        mainLink: '',
      }
    }

    props.updateUserProfile(data);
  }

  const onSelectedPhoto = (evt) => {
    const photo = evt.target.files;

    if (photo.length) {
      props.updateUserPhoto(photo[0]);
    }
  }

  const initialValues = {
    fullName: profile.fullName,
    aboutMe: profile.aboutMe,
    lookingForAJobDescription: profile.lookingForAJobDescription,
    lookingForAJob: profile.lookingForAJob ? 'Да' : 'Нет',
    ...profile.contacts
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
              <ProfileEditForm
                profile={profile}
                ref={editForm}
                onSubmit={onSubmit}
                initialValues={initialValues}
              />
              :
              <ProfileData
                isOwner={isOwner}
                profile={profile}
                status={status}
                updateUserStatus={props.updateUserStatus}
              />
          }
        </div>

        <div>
          <Button
            text={editMode ? 'Сохранить' : 'Редактировать профиль'}
            className='profile-info__edit-btn'
            onClick={editMode ? saveData : activateEditMode}
          />
          {
            editMode &&
            <Button
              text={'Отменить'}
              className='profile-info__cancel-btn'
              onClick={deactivateEditMode}
            />
          }
        </div>
      </div>

      <div>
        {
          !editMode && <ProfileContacts contacts={profile.contacts} />
        }
      </div>
    </div>
  );
}

export default ProfileInfo;