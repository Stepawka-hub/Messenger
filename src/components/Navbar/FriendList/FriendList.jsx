import './FriendList.css';
import FriendItem from './FriendItem/FriendItem';

const FriendList = (props) => {
  const friendsData = props.friends.map((friend) =>
    <FriendItem state={friend} key={friend.userid} />
  );
  const friendsCount = friendsData.length;

  return (
    <div className='friends-container'>
      <h2 className='friends__title'>Friends ({friendsCount})</h2>
      <div className='friends-list'>
        {friendsData}
      </div>
    </div>
  )
}

export default FriendList;