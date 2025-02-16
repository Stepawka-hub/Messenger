import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';
import UserDetails from './UserDetails/UserDetails';
import Loader from '../common/Loader/Loader';

import logo from '../../assets/images/logo.png';
import logoutIcon from '../../assets/images/logout.svg';
import avatarDefault from './../../assets/images/black.png';
import Button from '../common/Button/Button';

import { logoutUser } from '../../redux/authReducer';


const Header = ({ login, email, photos, ...props }) => {
  const userDetails = {
    login: login,
    email: email,
    photo: photos?.small || avatarDefault
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
                  <div className='header__user-details'>
                    <UserDetails {...userDetails} />
                    <Button className='header__logout' onClick={props.logoutUser}>
                      <img src={logoutIcon} alt='Logout'></img>
                    </Button>
                  </div>
                  :
                  <NavLink to='/login' className='header__link'>
                    Login
                  </NavLink>
              }
            </div>
        }
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  login: state.auth.login,
  email: state.auth.email,
  isLoading: state.auth.isLoading,
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { logoutUser })(Header);