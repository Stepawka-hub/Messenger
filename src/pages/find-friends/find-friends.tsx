import { Loader } from "@components/common/loader";
import { Pagination } from "@components/common/pagination";
import { UserList } from "@components/user-list";
import { usePaginatedUsers } from "@hooks/usePaginatedUsers";
import useTitle from "@hooks/useTitle";
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={s.section}>
      <h2 className={s.title}>Пользователи</h2>
      <UserList
        users={users}
        onFollow={followToUser}
        onUnFollow={unfollowFromUser}
        followingInProgress={followingInProgress}
      />
      <Pagination {...pagination} />
    </section>
  );
};
