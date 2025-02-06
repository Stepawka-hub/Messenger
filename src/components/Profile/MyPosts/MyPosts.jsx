import './MyPosts.css';
import Post from './Post/Post'
import Button from '../../common/Button/Button';

const MyPosts = (props) => {
  const state = props.profilePage;

  const postsElements = state.posts.map(post =>
    <Post postid={post.postid} message={post.message} key={post.postid} />)

  const addPost = () => {
    props.addPost();
  }

  const onPostChange = (evt) => {
    const text = evt.target.value;
    props.updateNewPostText(text);
  }
  
  return (
    <div className='posts-container'>
      <h3 className='posts-container__title'>
        My posts
      </h3>

      <div className='post-container'>
        <textarea
          name="newpost"
          className="textarea post-textarea"
          id="newpost"
          placeholder='Что у вас нового?'
          value={state.newPostText}
          onChange={onPostChange}
        />

        <Button onClick={addPost} text="Отправить" />
      </div>

      <section className='post-list'>
        {postsElements}
      </section>
    </div>
  );
}

export default MyPosts;