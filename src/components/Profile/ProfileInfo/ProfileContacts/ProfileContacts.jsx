import { getSafeValue } from '../../../../utils/helpers/valueHelpers';
import ProfileInfoItem from '../ProfileInfoItem/ProfileInfoItem'
import s from './ProfileContacts.module.css';

const getValue = getSafeValue('-');

const ProfileContacts = ({ contacts }) => {
  const profileContacts = [
    {
      label: 'VK',
      value: getValue(contacts.vk)
    },
    {
      label: 'Facebook',
      value: getValue(contacts.facebook)
    },
    {
      label: 'Twitter',
      value: getValue(contacts.twitter)
    },
    {
      label: 'Instagram',
      value: getValue(contacts.instagram)
    },
    {
      label: 'GitHub',
      value: getValue(contacts.github)
    },
  ]

  return (
    <div className={s.profileContacts}>
      <h3 className={s.profileContacts__title}>
        Контакты
      </h3>
      {
        profileContacts.map((item, index) =>
          <ProfileInfoItem
            contact
            label={item.label}
            value={item.value}
            key={index}
          />
        )
      }
    </div>
  );
};

export default ProfileContacts;