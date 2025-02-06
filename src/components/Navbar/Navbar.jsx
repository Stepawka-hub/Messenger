import { NavLink } from 'react-router-dom';
import './Navbar.css';
import FriendListContainer from './FriendList/FriendListContainer';

const Navbar = () => {
  return (
    <nav className="nav">
      <div className='nav__links'>
        <NavLink to='/profile' className='nav__link'>Profile</NavLink>
        <NavLink to='/dialogs' className='nav__link'>Messages</NavLink>
        <NavLink to='/news' className='nav__link'>News</NavLink>
        <NavLink to='/users' className='nav__link'>Find friends</NavLink>
        <NavLink to='/music' className='nav__link'>Music</NavLink>
        <NavLink to='/settings' className='nav__link'>Settings</NavLink>
      </div>
      
      <div className='nav__friends'>
        <FriendListContainer />
      </div>
    </nav>
  );
}

export default Navbar;