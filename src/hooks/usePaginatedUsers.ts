import {
  getFilter,
  getFollowingInProgress,
  getIsLoading,
  getPagination,
  getSearchQuery,
  getUserList,
  setCurrentPage,
} from "@slices/users";
import { useDispatch, useSelector } from "@store";
import {
  followToUserAsync,
  getUsersAsync,
  unfollowFromUserAsync,
} from "@thunks/users";
import { useEffect } from "react";
import { TUserId } from "@types";

export const usePaginatedUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUserList);
  const isLoading = useSelector(getIsLoading);
  const followingInProgress = useSelector(getFollowingInProgress);
  const { totalUsersCount, currentPage, pageSize } = useSelector(getPagination);
  const search = useSelector(getSearchQuery);
  const filter = useSelector(getFilter);

  useEffect(() => {
    dispatch(
      getUsersAsync({
        currentPage,
        pageSize,
        term: search,
        friend: filter === "all" ? null : filter === "friends",
      })
    );
  }, [dispatch, currentPage, pageSize, search, filter]);

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
    filter
  };
};
