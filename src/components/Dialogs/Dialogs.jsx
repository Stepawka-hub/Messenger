import { connect } from 'react-redux';
import { compose } from 'redux';

import './Dialogs.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

import { sendMessageAC } from '../../redux/dialogsReducer';
import withAuthRedirect from '../../utils/withAuthRedirect';
import SendMessageForm from './SendMessageForm/SendMessageForm';

const Dialogs = (props) => {
  const state = props.dialogsPage;

  const dialogsElements = state.dialogs.map(dialog =>
    <DialogItem state={dialog} key={dialog.dialogid} />)

  const messagesElements = state.messages.map(message =>
    <Message state={message} key={message.msgid} />)

  const onSubmit = (formData) => {
    props.sendMessage(formData.newMessageText);
  }

  return (
    <section className='dialogs'>
      <div className='dialog-list'>
        {dialogsElements}
      </div>

      <div className='chat-container'>
        <div className='messages'>
          {messagesElements}
        </div>

        <div className='new-message'>
          <SendMessageForm onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

export default compose(
  connect(mapStateToProps, { sendMessage: sendMessageAC }),
  withAuthRedirect
)(Dialogs);