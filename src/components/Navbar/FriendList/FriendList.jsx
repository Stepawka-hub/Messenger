import './FriendList.css';
import FriendItem from './FriendItem/FriendItem';
import { useSelector } from 'react-redux';
import { getFriendList } from '../../../redux/sidebar/selectors';

const FriendList = () => {
  const friends = useSelector(getFriendList);

  const friendsData = friends.map((friend) =>
    <FriendItem
      username={friend.username}
      avatar={friend.avatar}
      key={friend.userid}
    />
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