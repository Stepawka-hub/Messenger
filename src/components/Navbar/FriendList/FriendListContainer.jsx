import { connect } from 'react-redux';
import FriendList from './FriendList';

const mapStateToProps = (state) => {
  return {
    friends: state.sidebar.friends
  }
}

const FriendListContainer = connect(mapStateToProps)(FriendList);

export default FriendListContainer;