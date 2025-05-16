import './DialogItem.css'
import { NavLink } from 'react-router-dom';

const DialogItem = ({dialog}) => {
  const path = '/dialogs/' + dialog.dialogid;

  return (
    <NavLink to={path} className='dialog-list__item'>
      { dialog.username }
    </NavLink>
  );
}

export default DialogItem;