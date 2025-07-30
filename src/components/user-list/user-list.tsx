import { FC } from "react";
import { useSelector } from "react-redux";
import { UserCard } from "@components/user-list/user-card";
import { StartDialogButton } from "@components/chat";
import { TSocialUser } from "@types";
import { getIsLoading } from "@slices/users";
import { List } from "@ui/list";
import { SkeletonCard } from "@ui/skeleton-card";
import { UserListProps } from "./type";
import { FollowButton } from "./follow-button";

export const UserList: FC<UserListProps> = ({
  users,
  currentUserId,
  pageSize,
}) => {
  const isLoading = useSelector(getIsLoading);

  const renderSkeleton = (_: number, key?: number) => (
    <SkeletonCard key={key} />
  );
  const customLoader = (
    <List items={[...Array(pageSize)]} renderItem={renderSkeleton} />
  );

  const renderUsers = (u: TSocialUser) => (
    <UserCard
      user={u}
      key={u.id}
      actions={
        u.id !== currentUserId && (
          <>
            <StartDialogButton userId={u.id} />
            <FollowButton userId={u.id} followed={u.followed} />
          </>
        )
      }
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
