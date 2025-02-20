import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = ({profile, status, updateUserStatus}) => {
  return (
    <section className="profile">
      <ProfileInfo 
        profile={profile}
        status={status}
        updateUserStatus={updateUserStatus}
      />
      <MyPosts />
    </section>
  );
}

export default Profile;