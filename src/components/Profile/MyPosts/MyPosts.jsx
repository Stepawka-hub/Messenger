import { addPostAC } from '../../../redux/profile/actions';
import { connect } from 'react-redux';

import './MyPosts.css';
import Post from './Post/Post'
import SendMessageForm from './AddPostForm/AddPostForm';
import { getProfilePage } from '../../../redux/profile/selectors';

const MyPosts = (props) => {
  const state = props.profilePage;

  const postsElements = state.posts.map(post =>
    <Post postid={post.postid} message={post.message} key={post.postid} />)

  const onSubmit = (formData) => {
    props.addPost(formData.newPostText);
  }

  return (
    <div className='posts-container'>
      <h3 className='posts-container__title'>
        My posts
      </h3>

      <div className='new-post-container'>
        <SendMessageForm
          addPost={props.addPost}
          onSubmit={onSubmit}
        />
      </div>

      <section className='post-list'>
        {postsElements}
      </section>
    </div>
  );
}


const mapStateToProps = (state) => ({
  profilePage: getProfilePage(state)
});

export default connect(mapStateToProps, {
  addPost: addPostAC
})(MyPosts);