import ProfileInfoItem from '../ProfileInfoItem/ProfileInfoItem'
import s from './ProfileContacts.module.css';

const ProfileContacts = ({ contacts }) => {
  const profileContacts = {
    vk: contacts.vk || '-',
    facebook: contacts.facebook || '-',
    twitter: contacts.twitter || '-',
    instagram: contacts.instagram || '-',
    github: contacts.github || '-',
  }

  return (
    <div className={s.profileContacts}>
      <h3 className={s.profileContacts__title}>
        Контакты
      </h3>
      {
        Object.entries(profileContacts).map(([key, value], index) =>
          <ProfileInfoItem
            contact
            label={key}
            value={value}
            key={index}
          />
        )
      }
    </div>
  );
};

export default ProfileContacts;