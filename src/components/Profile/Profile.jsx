import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Loader from '../common/Loader/Loader';

const Profile = ({ isOwner, profile, status, isUpdatingPhoto, ...props }) => {
  return (
    <section>
      {
        !profile ? <Loader /> :
          <ProfileInfo
            isOwner={isOwner}
            profile={profile}
            status={status}
            isUpdatingPhoto={isUpdatingPhoto}
            updateUserStatus={props.updateUserStatus}
            updateUserPhoto={props.updateUserPhoto}
            updateUserProfile={props.updateUserProfile}
          />
      }
      <MyPosts />
    </section>
  );
}

export default Profile;