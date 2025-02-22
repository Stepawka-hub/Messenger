import './UserDetails.css';
import { useSelector } from 'react-redux';
import avatarDefault from './../../../assets/images/black.png';
import { getAuthEmail, getAuthLogin, getAuthPhoto } from '../../../redux/auth/selectors';

const UserDetails = () => {
  const login = useSelector(getAuthLogin);
  const email = useSelector(getAuthEmail);
  const photos = useSelector(getAuthPhoto);

  return (
    <div className='user-details'>
      <div className='user-details__avatar'>
        <img src={photos?.small || avatarDefault} className='avatar' alt="Avatar" />
      </div>
      <div>
        <h4 className='user-details__login'>
          {login}
        </h4>
        <p className='user-details__email'>
          {email}
        </p>
      </div>
    </div>
  )
}

export default UserDetails;