import { UserCard } from "@components/user-list/user-card";
import { checkInProgress } from "@utils/helpers/array-helpers";
import { FC } from "react";
import { UserListProps } from "./type";
import s from "./user-list.module.css";
import { NoDataFound } from "@ui/no-data-found";

export const UserList: FC<UserListProps> = ({
  users,
  onFollow,
  onUnFollow,
  followingInProgress,
}) => {
  if (!users.length) {
    return <NoDataFound label="По запросу ничего не найдено" />;
  }

  return (
    <section className={s.list}>
      {users.map((u) => (
        <UserCard
          user={u}
          key={u.id}
          followToUser={onFollow}
          unfollowFromUser={onUnFollow}
          followingInProgress={checkInProgress(followingInProgress, u.id)}
        />
      ))}
    </section>
  );
};
