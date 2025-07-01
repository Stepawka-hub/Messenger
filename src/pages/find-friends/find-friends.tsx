import { Helmet } from "@components/helmet";
import { UserList } from "@components/user-list";
import { UserSearch } from "@components/user-search";
import { usePaginatedUsers } from "@hooks/usePaginatedUsers";
import { Pagination } from "@ui/pagination";
import { SkeletonCard } from "@ui/skeleton-card";
import { FC } from "react";
import s from "./find-friends.module.css";
import { useSelector } from "@store";
import { getCurrentUser } from "@slices/auth";

export const FindFriends: FC = () => {
  const {
    users,
    isLoading,
    followingInProgress,
    followToUser,
    unfollowFromUser,
    pagination,
    filter,
  } = usePaginatedUsers();
  const currentUser = useSelector(getCurrentUser);

  const title =
    filter === "all"
      ? "Пользователи"
      : filter === "friends"
      ? `Мои друзья (${pagination.totalCount})`
      : "Не в друзьях";

  return (
    <>
      <Helmet
        title="Поиск друзей"
        description="Найдите новых друзей и интересных людей, чтобы расширить свой круг общения"
      />
      <section className={s.section}>
        <h2 className={s.title}>{title}</h2>
        <div className={s.search}>
          <UserSearch />
        </div>
        <div className={s.users}>
          {isLoading ? (
            <div className={s.skeletonList}>
              {[...Array(pagination.pageSize)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <>
              <UserList
                currentUserId={currentUser?.id || null}
                users={users}
                onFollow={followToUser}
                onUnFollow={unfollowFromUser}
                followingInProgress={followingInProgress}
              />
              <Pagination {...pagination} />
            </>
          )}
        </div>
      </section>
    </>
  );
};
