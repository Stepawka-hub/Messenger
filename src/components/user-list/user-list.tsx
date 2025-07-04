import { UserCard } from "@components/user-list/user-card";
import { TSocialUser, TUserId } from "@types";
import { List } from "@ui/list";
import { SkeletonCard } from "@ui/skeleton-card";
import { checkInProgress } from "@utils/helpers/array-helpers";
import { FC } from "react";
import { UserListProps } from "./type";
import s from "./user-list.module.css";
import { useSelector } from "react-redux";
import { getFollowingInProgress, getIsLoading } from "@slices/users";
import { useDispatch } from "@store";
import { followToUserAsync, unfollowFromUserAsync } from "@thunks/users";

export const UserList: FC<UserListProps> = ({
  users,
  currentUserId,
  pageSize,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const followingInProgress = useSelector(getFollowingInProgress);

  const followToUser = (userId: TUserId) => {
    dispatch(followToUserAsync(userId));
  };

  const unfollowFromUser = (userId: TUserId) => {
    dispatch(unfollowFromUserAsync(userId));
  };

  const customLoader = (
    <div className={s.skeletonList}>
      {[...Array(pageSize)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );

  const renderUsers = (u: TSocialUser) => (
    <UserCard
      user={u}
      key={u.id}
      isCurrentUser={u.id === currentUserId}
      followToUser={followToUser}
      unfollowFromUser={unfollowFromUser}
      followingInProgress={checkInProgress(followingInProgress, u.id)}
    />
  );

  return (
    <List
      items={users}
      renderItem={renderUsers}
      isLoading={isLoading}
      emptyMessage="По запросу ничего не найдено"
      customLoader={customLoader}
    />
  );
};
