import { UserCard } from "@components/user-list/user-card";
import { getIsLoading } from "@slices/users";
import { TSocialUser } from "@types";
import { List } from "@ui/list";
import { SkeletonCard } from "@ui/skeleton-card";
import { FC } from "react";
import { useSelector } from "react-redux";
import { UserListProps } from "./type";
import { StartDialogButton } from "@components/chatting";
import { FollowButton } from "./follow-button";
import s from "./user-list.module.css";

export const UserList: FC<UserListProps> = ({
  users,
  currentUserId,
  pageSize,
}) => {
  const isLoading = useSelector(getIsLoading);

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
