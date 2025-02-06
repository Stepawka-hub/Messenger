import './ProfileInfo.css'
import avatar from '../../../assets/images/black.png';
import Loader from '../../common/Loader/Loader';

const ProfileInfo = (props) => {
  const profile = props.profile;

  if (!profile) {
    return <Loader />
  }

  const profileData = {
    photos: profile.photos.small || avatar,
    fullName: profile.fullName || 'Имя пользователя',
    aboutMe: profile.aboutMe || 'Обо мне',
    lookingForAJob: profile.lookingForAJob ? 'Да' : 'Нет',
    lookingForAJobDescription: profile.lookingForAJobDescription || 'нет',

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
          <img src={profileData.photos} alt="Avatar" />
        </div>

        <div>
          <h2 className="profile-info__title">
            {profileData.fullName}
          </h2>

          <div className="profile-info__description">
            <p className='profile-info__item'>
              <span className='profile-info__label'>Обо мне: </span>
              {profileData.aboutMe}
            </p>
            <p className='profile-info__item'>
              <span className='profile-info__label'>Ищу работу: </span>
              {profileData.lookingForAJob}
            </p>
            <p className='profile-info__item'>
              <span className='profile-info__label'>Описание: </span>
              {profileData.lookingForAJobDescription}
            </p>
          </div>
        </div>
      </div>

      <div className='profile-contacts'>
        <h3 className='profile-contacts__title'>Контакты</h3>
        <p className='profile-contacts__item'>
          <span className='profile-contacts__label'>VK: </span>
          {profileData.vk}
        </p>
        <p className='profile-contacts__item'>
          <span className='profile-contacts__label'>Facebook: </span>
          {profileData.facebook}
        </p>
        <p className='profile-contacts__item'>
          <span className='profile-contacts__label'>Twitter: </span>
          {profileData.twitter}
        </p>
        <p className='profile-contacts__item'>
          <span className='profile-contacts__label'>Instagram: </span>
          {profileData.instagram}
        </p>
        <p className='profile-contacts__item'>
          <span className='profile-contacts__label'>GitHub: </span>
          {profileData.github}
        </p>
      </div>
    </div>
  );
}

export default ProfileInfo;