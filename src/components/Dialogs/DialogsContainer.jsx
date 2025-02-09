import './Dialogs.css';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { sendMessageAC, updateNewMessageTextAC } from '../../redux/dialogsReducer';

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth
  }
}

const DialogsContainer = connect(mapStateToProps, {
  sendMessage: sendMessageAC,
  updateNewMessageText: updateNewMessageTextAC
})(Dialogs);

export default DialogsContainer;