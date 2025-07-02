import { ProfileInfo } from "@components/profile";
import { getCurrentUser } from "@slices/auth";
import { getIsLoadingProfile, getProfile } from "@slices/profile";
import { useDispatch, useSelector } from "@store";
import { getProfileAsync, getProfileStatusAsync } from "@thunks/profile";
import { BackButton } from "@ui/back-button";
import { Loader } from "@ui/loader";
import { NoDataFound } from "@ui/no-data-found";
import { PageWrapper } from "@ui/page-wrapper";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(getProfile);
  const isLoading = useSelector(getIsLoadingProfile);
  const currentUser = useSelector(getCurrentUser);

  const { userId: routeUserId } = useParams<{ userId?: string }>();
  const profileId = routeUserId ? Number(routeUserId) : currentUser?.id;

  useEffect(() => {
    // Если в URL не указан ID и есть текущий пользователь
    if (!routeUserId && currentUser?.id) {
      navigate(`/profile/${currentUser?.id}`, { replace: true });
      return;
    }

    if (profileId) {
      dispatch(getProfileAsync(profileId));
      dispatch(getProfileStatusAsync(profileId));
    }
  }, [dispatch, navigate, profileId, currentUser, routeUserId]);

  if (isLoading) {
    return (
      <PageWrapper title="Профиль" description="Страница профиля" noIndex>
        <Loader />
      </PageWrapper>
    );
  }

  if (!profile || !profileId) {
    return (
      <PageWrapper
        title="Профиль не найден"
        description="Профиль не найден. Возможно, профиль был удален или не существует."
        noIndex
      >
        <NoDataFound label="Профиль не найден!">
          <BackButton />
        </NoDataFound>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={profile?.fullName} description="Страница профиля">
      <ProfileInfo
        id={profileId}
        isOwner={profileId === currentUser?.id}
        profile={profile}
      />
    </PageWrapper>
  );
};
