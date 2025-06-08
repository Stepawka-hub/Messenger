import { useDispatch, useSelector } from "@store";
import { useEffect } from "react";

import { Loader } from "@components/common/loader";
import { ProfileInfo } from "@components/profile";
import { useTitle } from "@hooks/useTitle";
import { getCurrentUser } from "@slices/auth";
import { getProfile } from "@slices/profile";
import { getProfileAsync, getProfileStatusAsync } from "@thunks/profile";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);

  const currentUser = useSelector(getCurrentUser);
  const { userId } = useParams();

  useEffect(() => {
    const id = Number(userId);
    if (id) {
      dispatch(getProfileAsync(id));
      dispatch(getProfileStatusAsync(id));
    }
  }, [dispatch, userId]);

  useTitle(profile?.fullName);

  if (!profile) {
    return <Loader />;
  }

  return (
    <section>
      <ProfileInfo isOwner={userId === currentUser?.id} profile={profile} />
      {/* <MyPosts /> */}
    </section>
  );
};
