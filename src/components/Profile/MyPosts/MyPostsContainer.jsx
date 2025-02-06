import './MyPosts.css';
import MyPosts from './MyPosts';
import { addPostAC, updateNewPostTextAC } from '../../../redux/profileReducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage
  }
}

const MyPostsContainer = connect(mapStateToProps, {
  addPost: addPostAC,
  updateNewPostText: updateNewPostTextAC
})(MyPosts);

export default MyPostsContainer;