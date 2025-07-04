import { UserList } from "@components/user-list";
import { UserSearch } from "@components/user-search";
import { usePaginatedUsers } from "@hooks/usePaginatedUsers";
import { getCurrentUser } from "@slices/auth";
import { useSelector } from "@store";
import { PageWrapper } from "@ui/page-wrapper";
import { Pagination } from "@ui/pagination";
import { FC } from "react";
import s from "./find-friends.module.css";

export const FindFriends: FC = () => {
  const { users, pagination, filter } = usePaginatedUsers();
  const currentUser = useSelector(getCurrentUser);

  const title =
    filter === "all"
      ? "Пользователи"
      : filter === "friends"
      ? `Мои друзья (${pagination.totalCount})`
      : "Не в друзьях";

  return (
    <PageWrapper
      pageTitle={title}
      title={title}
      description="Найдите новых друзей и интересных людей, чтобы расширить свой круг общения"
    >
      <div className={s.search}>
        <UserSearch />
      </div>
      <div className={s.users}>
        <UserList
          users={users}
          currentUserId={currentUser?.id || null}
          pageSize={pagination.pageSize}
        />
        <Pagination {...pagination} />
      </div>
    </PageWrapper>
  );
};
