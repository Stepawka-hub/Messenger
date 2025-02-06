import './FriendItem.css';

const FriendItem = (props) => {
  return (
    <div className='friend' onClick={() => alert(`Я твой друг - ${props.state.username}!`)}>
      <img src={props.state.avatar} className='avatar' alt="Avatar" />
      <span className='friend__name'>{props.state.username}</span>
    </div>
  )
}

export default FriendItem;