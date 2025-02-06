import './DialogItem.css'
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
  const path = '/dialogs/' + props.state.dialogid;

  return (
    <NavLink to={path} className='dialog-list__item'>
      { props.state.username }
    </NavLink>
  );
}

export default DialogItem;