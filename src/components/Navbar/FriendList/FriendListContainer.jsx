import { connect } from 'react-redux';
import FriendList from './FriendList';
import { getFriendList } from '../../../redux/sidebar/selectors';

const mapStateToProps = (state) => ({
  friends: getFriendList(state),
});

const FriendListContainer = connect(mapStateToProps)(FriendList);

export default FriendListContainer;