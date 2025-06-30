import { Helmet } from "@components/helmet";
import { UserList } from "@components/user-list";
import { UserSearch } from "@components/user-search";
import { usePaginatedUsers } from "@hooks/usePaginatedUsers";
import { Pagination } from "@ui/pagination";
import { SkeletonCard } from "@ui/skeleton-card";
import { FC } from "react";
import s from "./find-friends.module.css";

export const FindFriends: FC = () => {
  const {
    users,
    isLoading,
    followingInProgress,
    followToUser,
    unfollowFromUser,
    pagination,
  } = usePaginatedUsers();

  return (
    <>
      <Helmet
        title="Поиск друзей"
        description="Найдите новых друзей и интересных людей, чтобы расширить свой круг общения"
      />
      <section className={s.section}>
        <h2 className={s.title}>Пользователи</h2>
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
