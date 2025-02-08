import './User.css';
import Button from '../../common/Button/Button';
import { NavLink } from 'react-router-dom';
import avatar from '../../../assets/images/black.png';
import usersAPI from '../../../api/api';

const User = (props) => {
  const state = props.userData;

  const followToUser = () => {
    props.setFollowingProgress(true, state.id);
    usersAPI.followUser(state.id)
      .then((data) => {
        if (data.resultCode === 0) {
          props.followToUser(state.id);
        }

        props.setFollowingProgress(false, state.id);
      })
  };

  const unfollowFromUser = () => {
    props.setFollowingProgress(true, state.id);
    usersAPI.unfollowUser(state.id)
      .then((data) => {
        if (data.resultCode === 0) {
          props.unfollowFromUser(state.id);
        }

        props.setFollowingProgress(false, state.id);
      });
  };

  const checkFollowingProgress = () => {
    return props.followingInProgress.some(id => id === state.id);
  };

  return (
    <article className='user-card'>
      <header className='user-card__header'>
        <div className='user-card__avatar'>
          <NavLink to={`/profile/${state.id}`}>
            <img src={state.photos?.small ?? avatar} alt="Avatar" />
          </NavLink>
        </div>
        <Button
          text={state.followed ? 'Unfollowed' : 'Follow'}
          className={'user-card__btn'}
          disabled={checkFollowingProgress()}
          onClick={state.followed ? unfollowFromUser : followToUser}
        />
      </header>

      <div className='user-card__info'>
        <div className='user-card__description'>
          <h3 className='user-card__name'>
            {state.name}
          </h3>
          <p className='user-card__status'>
            {state.status ?? 'There is no description...'}
          </p>
        </div>

        <div className='user-card__location'>
          <span className='user-card__country'>
            {state.location.country}
          </span>
          <span className='user-card__city'>
            {state.location.city}
          </span>
        </div>
      </div>
    </article>
  )
}

export default User;