import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = ({isOwner, profile, status, isUpdatingPhoto, updateUserStatus, updateUserPhoto}) => {
  return (
    <section className="profile">
      <ProfileInfo
        isOwner={isOwner}
        profile={profile}
        status={status}
        isUpdatingPhoto={isUpdatingPhoto}
        updateUserStatus={updateUserStatus}
        updateUserPhoto={updateUserPhoto}
      />
      <MyPosts />
    </section>
  );
}

export default Profile;