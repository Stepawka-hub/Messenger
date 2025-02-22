import './ProfileInfo.css'
import avatar from '../../../assets/images/black.png';
import Loader from '../../common/Loader/Loader';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import ProfileInfoItem from './ProfileInfoItem/ProfileInfoItem';

const ProfileInfo = ({profile, status, updateUserStatus}) => {
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

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="profile-info__avatar">
          <img src={profile.photos.small || avatar} alt="Avatar" />
        </div>

        <div>
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