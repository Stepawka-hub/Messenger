import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Header.css';
import UserDetails from './UserDetails/UserDetails';
import Loader from '../common/Loader/Loader';

import logo from '../../assets/images/logo.png';
import logoutIcon from '../../assets/images/logout.svg';
import Button from '../common/Button/Button';

import { logoutUser } from '../../redux/auth/thunks';
import { getIsAuth, getIsLoading } from '../../redux/auth/selectors';


const Header = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading);
  const isAuth = useSelector(getIsAuth);

  const logout = () => {
    dispatch(logoutUser());
  }

  return (
    <header className="header">
      <img src={logo} className='logo' alt='Logo' />

      <div>
        {
          isLoading ?
            <Loader /> :
            <div>
              {
                isAuth ?
                  <div className='header__user-details'>
                    <UserDetails />
                    <Button className='header__logout' onClick={logout}>
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

export default Header;