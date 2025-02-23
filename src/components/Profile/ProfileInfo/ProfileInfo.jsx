import './ProfileInfo.css'
import avatar from '../../../assets/images/black.png';
import Loader from '../../common/Loader/Loader';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import ProfileInfoItem from './ProfileInfoItem/ProfileInfoItem';
import InputFile from '../../common/InputFile/InputFile';

const ProfileInfo = ({ isOwner, profile, status, isUpdatingPhoto, updateUserStatus, updateUserPhoto }) => {
  if (!profile) {
    return <Loader />
  }

  const translations = {
    aboutMe: 'Обо мне',
    lookingForAJob: 'Ищу работу',
    lookingForAJobDescription: 'Описание поиска работы'
  };

  const profileInfo = {
    aboutMe: profile.aboutMe || 'Нет',
    lookingForAJob: profile.lookingForAJob ? 'Да' : 'Нет',
    lookingForAJobDescription: profile.lookingForAJobDescription || 'Нет',
  }

  const profileContacts = {
    vk: profile.contacts.vk || '-',
    facebook: profile.contacts.facebook || '-',
    twitter: profile.contacts.twitter || '-',
    instagram: profile.contacts.instagram || '-',
    github: profile.contacts.github || '-',
  }

  const onSelectedPhoto = (evt) => {
    const photo = evt.target.files;

    if (photo.length) {
      updateUserPhoto(photo[0]);
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-info">
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

        <div className='profile-info__data'>
          <h2 className="profile-info__title">
            {profile.fullName || 'Имя пользователя'}
          </h2>

          <div className="profile-info__description">
            <ProfileStatus
              label='Статус: '
              status={status}
              updateUserStatus={updateUserStatus}
            />
            {
              Object.entries(profileInfo).map(([key, value], index) =>
                <ProfileInfoItem
                  label={translations[key]}
                  value={value}
                  key={index}
                />
              )
            }
          </div>
        </div>
      </div>

      <div className='profile-contacts'>
        <h3 className='profile-contacts__title'>Контакты</h3>
        {
          Object.entries(profileContacts).map(([key, value], index) =>
            <ProfileInfoItem
              contacts
              label={key}
              value={value}
              key={index}
            />
          )
        }
      </div>
    </div>
  );
}

export default ProfileInfo;