import './FriendItem.css';

const FriendItem = ({ username, avatar }) => {
  const handleClick = () => {
    alert(`Я твой друг - ${username}!`)
  }

  return (
    <div className='friend' onClick={handleClick}>
      <img src={avatar} className='avatar' alt="Avatar" />
      <span className='friend__name'>
        {username}
      </span>
    </div>
  )
}

export default FriendItem;