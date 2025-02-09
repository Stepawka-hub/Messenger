import './Dialogs.css';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { sendMessageAC, updateNewMessageTextAC } from '../../redux/dialogsReducer';
import withAuthRedirect from '../../utils/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

export default compose(
  connect(mapStateToProps, {
    sendMessage: sendMessageAC,
    updateNewMessageText: updateNewMessageTextAC
  }),
  withAuthRedirect
)(Dialogs);