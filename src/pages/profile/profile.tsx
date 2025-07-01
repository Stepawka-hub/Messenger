import { Helmet } from "@components/helmet";
import { MyPosts } from "@components/posts/my-posts";
import { ProfileInfo } from "@components/profile";
import { getCurrentUser } from "@slices/auth";
import { getIsLoadingProfile, getProfile } from "@slices/profile";
import { useDispatch, useSelector } from "@store";
import { getProfileAsync, getProfileStatusAsync } from "@thunks/profile";
import { BackButton } from "@ui/back-button";
import { Loader } from "@ui/loader";
import { NoDataFound } from "@ui/no-data-found";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);
  const isLoading = useSelector(getIsLoadingProfile);

  const currentUser = useSelector(getCurrentUser);
  const { userId } = useParams();
  const userIdNumber = Number(userId);
  const isOwner = userIdNumber === currentUser?.id;

  useEffect(() => {
    if (userIdNumber) {
      dispatch(getProfileAsync(userIdNumber));
      dispatch(getProfileStatusAsync(userIdNumber));
    }
  }, [dispatch, userIdNumber]);

  if (isLoading) {
    return (
      <>
        <Helmet title="Профиль" description="Страница профиля" />
        <Loader />
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Helmet
          title="Профиль не найден"
          description="Профиль не найден. Возможно, профиль был удален или не существует."
        />
        <NoDataFound label="Профиль не найден!">
          <BackButton />
        </NoDataFound>
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
