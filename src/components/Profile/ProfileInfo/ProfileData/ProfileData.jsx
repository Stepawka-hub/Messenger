import ProfileInfoItem from '../ProfileInfoItem/ProfileInfoItem';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import s from './ProfileData.module.css';

const ProfileData = ({ profile, isOwner, status, updateUserStatus }) => {
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

  return (
    <div className={s.profileData}>
      <h2 className={s.profileData__title}>
        {profile.fullName || 'Имя пользователя'}
      </h2>

      <div className={s.profileData__description}>
        <ProfileStatus
          label='Статус: '
          isOwner={isOwner}
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
  )
}

export default ProfileData;