import {
  getFollowingInProgress,
  getIsLoading,
  getPagination,
  getUserList,
  setCurrentPage
} from "@slices/users";
import { useDispatch, useSelector } from "@store";
import {
  followToUserAsync,
  getUsersAsync,
  unfollowFromUserAsync,
} from "@thunks/users";
import { useEffect } from "react";
import { TUserId } from "src/types";

export const usePaginatedUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUserList);
  const isLoading = useSelector(getIsLoading);
  const followingInProgress = useSelector(getFollowingInProgress);
  const { totalUsersCount, currentPage, pageSize } = useSelector(getPagination);

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

  return {
    users,
    isLoading,
    followingInProgress,
    followToUser,
    unfollowFromUser,
    pagination: {
      totalCount: totalUsersCount,
      currentPage,
      pageSize,
      setCurrentPage: handlePageChange,
    },
  };
};
