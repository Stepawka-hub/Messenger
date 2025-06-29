import { UserList } from "@components/user-list";
import { UserSearch } from "@components/user-search";
import { usePaginatedUsers } from "@hooks/usePaginatedUsers";
import { useTitle } from "@hooks/useTitle";
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
  useTitle("Find friends");

  return (
    <section className={s.section}>
      <UserSearch />
      <h2 className={s.title}>Пользователи</h2>
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
    </section>
  );
};
