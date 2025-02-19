import React from 'react';
import { addPostAC } from '../../../redux/profile/actions';
import { connect } from 'react-redux';

import './MyPosts.css';
import Post from './Post/Post'
import SendMessageForm from './AddPostForm/AddPostForm';
import { getProfilePage } from '../../../redux/profile/selectors';

class MyPosts extends React.Component {
  onSubmit = (formData) => {
    this.props.addPost(formData.newPostText);
  }

  render() {
    console.log('MYPOSTS');

    const postsElements = this.props.profilePage.posts.map(post =>
      <Post postid={post.postid} message={post.message} key={post.postid} />)

    return (
      <div className='posts-container'>
        <h3 className='posts-container__title'>
          My posts
        </h3>

        <div className='new-post-container'>
          <SendMessageForm
            addPost={this.props.addPost}
            onSubmit={this.onSubmit}
          />
        </div>

        <section className='post-list'>
          {postsElements}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profilePage: getProfilePage(state)
});

export default connect(mapStateToProps, {
  addPost: addPostAC
})(MyPosts);