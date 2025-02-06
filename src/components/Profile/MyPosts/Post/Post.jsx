import './Post.css';

const avatar = require('../../../../assets/images/black.png');

const Post = (props) => {
  return (
    <article className='post'>
      <img src={avatar} className='avatar' alt="Avatar" />
      <span className='post__text'>{ props.message }</span>
    </article>
  );
}

export default Post;