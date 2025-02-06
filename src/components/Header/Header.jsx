import { NavLink } from 'react-router-dom';

import './Header.css';
import UserDetails from './UserDetails/UserDetails';
import Loader from '../common/Loader/Loader';

import logo from '../../assets/images/logo.png';
import avatarDefault from './../../assets/images/black.png';

const Header = (props) => {
  const userDetails = {
    login: props.login,
    email: props.email,
    photo: props.photos?.small || avatarDefault
  }

  return (
    <header className="header">
      <img src={logo} className='logo' alt='Logo' />

      <div>
        {
          props.isLoading ?
            <Loader /> :
            <div>
              {
                props.isAuth ?
                  <UserDetails {...userDetails} /> :
                  <NavLink to='/login' className='header__link'>Login</NavLink>
              }
            </div>
        }
      </div>
    </header>
  );
}

export default Header;