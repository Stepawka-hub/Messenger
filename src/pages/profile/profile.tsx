import { useDispatch, useSelector } from "@store";
import { useEffect } from "react";

import { Helmet } from "@components/helmet";
import { MyPosts } from "@components/posts/my-posts";
import { ProfileInfo } from "@components/profile";
import { getCurrentUser } from "@slices/auth";
import { getProfile, setProfile } from "@slices/profile";
import { getProfileAsync, getProfileStatusAsync } from "@thunks/profile";
import { Loader } from "@ui/loader";
import { useParams } from "react-router-dom";

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

  if (!profile) {
    return (
      <>
        <Helmet title="Профиль" description="Страница профиля" />
        <Loader />
      </>
    );
  }

  return (
    <>
      <Helmet title={profile?.fullName} description="Страница профиля" />
      <section>
        <ProfileInfo isOwner={isOwner} profile={profile} />
        <MyPosts />
      </section>
    </>
  );
};
