import './User.css';
import Button from '../../../components/common/Button/Button';
import { NavLink } from 'react-router-dom';
import avatar from '../../../assets/images/black.png';

const User = ({userData, followToUser, unfollowFromUser, followingInProgress}) => {
  const follow = () => {
    followToUser(userData.id);
  };

  const unfollow = () => {
    unfollowFromUser(userData.id);
  };

  const checkFollowingProgress = () => {
    return followingInProgress.some(id => id === userData.id);
  };

  return (
    <article className='user-card'>
      <header className='user-card__header'>
        <div className='user-card__avatar'>
          <NavLink to={`/profile/${userData.id}`}>
            <img src={userData.photos?.small ?? avatar} alt="Avatar" />
          </NavLink>
        </div>
        <Button
          text={userData.followed ? 'Unfollowed' : 'Follow'}
          className={'user-card__btn'}
          disabled={checkFollowingProgress()}
          onClick={userData.followed ? unfollow : follow}
        />
      </header>

      <div className='user-card__info'>
        <div className='user-card__description'>
          <h3 className='user-card__name'>
            {userData.name}
          </h3>
          <p className='user-card__status'>
            {userData.status ?? 'There is no description...'}
          </p>
        </div>

        <div className='user-card__location'>
          <span className='user-card__country'>
            {userData.location.country}
          </span>
          <span className='user-card__city'>
            {userData.location.city}
          </span>
        </div>
      </div>
    </article>
  )
}

export default User;