import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  return (
    <section className="profile">
      <ProfileInfo profile={props.profile} />
      <MyPostsContainer />
    </section>
  );
}

export default Profile;