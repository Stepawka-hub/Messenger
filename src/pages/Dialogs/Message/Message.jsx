import './Message.css';

const Message = ({message}) => {
  return (
    <div className="message">
      <div>
        <img src={message.avatar} className="avatar" alt="Avatar" />
      </div>
      <div>
        <h4 className="message__author">
          {message.username}
        </h4>
        <span className="message__text">
          {message.text}
        </span>
      </div>
    </div>
  )
}

export default Message;