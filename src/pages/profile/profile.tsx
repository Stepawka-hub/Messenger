import { useDispatch, useSelector } from "@store";
import { useEffect } from "react";

import { Loader } from "@ui/loader";
import { ProfileInfo } from "@components/profile";
import { useTitle } from "@hooks/useTitle";
import { getCurrentUser } from "@slices/auth";
import { getProfile, setProfile } from "@slices/profile";
import { getProfileAsync, getProfileStatusAsync } from "@thunks/profile";
import { useParams } from "react-router-dom";
import { MyPosts } from "@components/posts/my-posts";

export const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);

  const currentUser = useSelector(getCurrentUser);
  const { userId } = useParams();
  const userIdNumber = Number(userId);
  const isOwner = userIdNumber === currentUser?.id;

  useEffect(() => {
    if (userIdNumber) {
      dispatch(getProfileAsync(userIdNumber));
      dispatch(getProfileStatusAsync(userIdNumber));
    }

    return () => {
      dispatch(setProfile(null));
    };
  }, [dispatch, userIdNumber]);

  useTitle(profile?.fullName);

  if (!profile) {
    return <Loader />;
  }

  return (
    <section>
      <ProfileInfo isOwner={isOwner} profile={profile} />
      <MyPosts />
    </section>
  );
};
