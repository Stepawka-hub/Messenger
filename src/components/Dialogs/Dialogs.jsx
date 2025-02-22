import { useDispatch, useSelector } from 'react-redux';

import './Dialogs.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

import { sendMessageAC } from '../../redux/dialogs/actions';
import withAuthRedirect from '../../utils/withAuthRedirect';
import SendMessageForm from './SendMessageForm/SendMessageForm';
import { getDialogsPage } from '../../redux/dialogs/selectors';

const Dialogs = () => {
  const dispatch = useDispatch();
  const dialogsPage = useSelector(getDialogsPage);

  const dialogsElements = dialogsPage.dialogs.map(dialog =>
    <DialogItem dialog={dialog} key={dialog.dialogid} />)

  const messagesElements = dialogsPage.messages.map(message =>
    <Message message={message} key={message.msgid} />)

  const onSubmit = (formData) => {
    dispatch(sendMessageAC(formData.newMessageText));
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

export default withAuthRedirect(Dialogs);