import { addPostAC } from '../../../redux/profile/actions';
import { useDispatch, useSelector } from 'react-redux';

import './MyPosts.css';
import Post from './Post/Post'
import SendMessageForm from './AddPostForm/AddPostForm';
import { getPosts } from '../../../redux/profile/selectors';

const MyPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);

  const onSubmit = (formData) => {
    dispatch(addPostAC(formData.newPostText));
  }

  const postsElements = posts.map(post =>
    <Post postid={post.postid} message={post.message} key={post.postid} />)

  return (
    <div className='posts-container'>
      <h3 className='posts-container__title'>
        My posts
      </h3>

      <div className='new-post-container'>
        <SendMessageForm onSubmit={onSubmit} />
      </div>

      <section className='post-list'>
        {postsElements}
      </section>
    </div>
  );
}

export default MyPosts;