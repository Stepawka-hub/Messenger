import './Message.css';

const Message = (props) => {
  return (
    <div className="message">
      <div>
        <img src={props.state.avatar} className="avatar" alt="Avatar" />
      </div>
      <div>
        <h4 className="message__author">{props.state.username}</h4>
        <span className="message__text">{props.state.text}</span>
      </div>
    </div>
  )
}

export default Message;