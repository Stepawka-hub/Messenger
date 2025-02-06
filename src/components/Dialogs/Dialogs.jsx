import './Dialogs.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import Button from '../common/Button/Button';

const Dialogs = (props) => {
  const state = props.dialogsPage;

  const dialogsElements = state.dialogs.map(dialog =>
    <DialogItem state={dialog} key={dialog.dialogid} />)

  const messagesElements = state.messages.map(message =>
    <Message state={message} key={message.msgid} />)

  const sendMessage = () => {
    props.sendMessage();
  }

  const onMessageChange = (evt) => {
    const text = evt.target.value;
    props.updateNewMessageText(text);
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
          <textarea
            name="newmsg"
            className="textarea new-message__textarea"
            id="newmsg"
            placeholder='Введите сообщение...'
            value={state.newMessageText}
            onChange={onMessageChange}
          />
          <Button onClick={sendMessage} text="Отправить" />
        </div>
      </div>
    </section>
  );
}

export default Dialogs;