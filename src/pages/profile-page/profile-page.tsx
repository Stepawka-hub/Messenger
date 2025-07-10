import { ProfileInfo } from "@components/profile";
import { getCurrentUser } from "@slices/auth";
import {
  getFetchProfileError,
  getIsLoadingProfile,
  getProfile,
  setProfile,
} from "@slices/profile";
import { useDispatch, useSelector } from "@store";
import { getProfileAsync } from "@thunks/profile";
import { BackButton } from "@ui/back-button";
import { Loader } from "@ui/loader";
import { NoDataFound } from "@ui/no-data-found";
import { PageWrapper } from "@ui/page-wrapper";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(getProfile);
  const fetchError = useSelector(getFetchProfileError);
  const isLoading = useSelector(getIsLoadingProfile);
  const currentUser = useSelector(getCurrentUser);

  const { userId: routeUserId } = useParams<{ userId?: string }>();
  const profileId = routeUserId ? Number(routeUserId) : currentUser?.id;

  useEffect(() => {
    // Если в URL не указан ID и есть текущий пользователь
    if (!routeUserId && currentUser?.id) {
      navigate(`/profile/${currentUser.id}`, { replace: true });
    }
  }, [navigate, routeUserId, currentUser]);

  useEffect(() => {
    if (profileId) {
      dispatch(getProfileAsync(profileId));
    }

    return () => {
      dispatch(setProfile(null));
    };
  }, [dispatch, profileId]);

  if (isLoading) {
    return (
      <PageWrapper title="Профиль" description="Страница профиля" noIndex>
        <Loader />
      </PageWrapper>
    );
  }

  if (fetchError) {
    return (
      <PageWrapper
        title="Профиль не найден"
        description="Профиль не найден!"
        noIndex
      >
        <NoDataFound label="Профиль не найден!">
          <BackButton label="Вернуться к списку пользователей" path="/users" />
        </NoDataFound>
      </PageWrapper>
    );
  }

  if (!profile || !profileId) return null;

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
