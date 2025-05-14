import s from './ProfileInfoItem.module.css'

const ProfileInfoItem = (props) => {
  return (
    <div className={`${s.item} ${props.contact && s.contacts}`}>
      <span className={s.item__label}>
        {`${props.label}: `}
      </span>
      <span className={s.item__value}>
        {props.value}
      </span>
    </div>
  );
}

export default ProfileInfoItem;