import { FC, useEffect } from "react";

import {
  getCurrentPage,
  getFollowingInProgress,
  getIsLoading,
  getPageSize,
  getTotalUsersCount,
  getUserList,
  setCurrentPage,
} from "@slices/users";
import {
  followToUserAsync,
  getUsersAsync,
  unfollowFromUserAsync,
} from "@thunks/users";

import { Loader } from "@components/common/loader";
import { Pagination } from "@components/common/pagination";
import { TUserId } from "src/types";
import { useDispatch, useSelector } from "@store";
import { UserCard } from "@components/user-card";
import { checkInProgress } from "@utils/helpers/array-helpers";
import useTitle from "@hooks/useTitle";

import s from "./find-friends.module.css";

export const FindFriends: FC = () => {
  const dispatch = useDispatch();
  const userList = useSelector(getUserList);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const isLoading = useSelector(getIsLoading);

  const followingInProgress = useSelector(getFollowingInProgress);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);

  useTitle("Find friends");

  useEffect(() => {
    dispatch(getUsersAsync({ currentPage, pageSize }));
  }, [dispatch, currentPage, pageSize]);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const followToUser = (userId: TUserId) => {
    dispatch(followToUserAsync(userId));
  };

  const unfollowFromUser = (userId: TUserId) => {
    dispatch(unfollowFromUserAsync(userId));
  };

  return (
    <section className={s.section}>
      <h2 className={s.title}>Пользователи</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <div className={s.list}>
          {userList.map((u) => (
            <UserCard
              user={u}
              key={u.id}
              followToUser={followToUser}
              unfollowFromUser={unfollowFromUser}
              followingInProgress={checkInProgress(followingInProgress, u.id)}
            />
          ))}
        </div>
      )}

      <Pagination
        totalCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
      />
    </section>
  );
};
