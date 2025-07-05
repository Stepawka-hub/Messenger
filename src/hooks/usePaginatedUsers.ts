import {
  getFilter,
  getPagination,
  getSearchQuery,
  getUserList,
  setCurrentPage,
} from "@slices/users";
import { useDispatch, useSelector } from "@store";
import { getUsersAsync } from "@thunks/users";
import { useEffect } from "react";

export const usePaginatedUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUserList);
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

  return {
    users,
    filter,
    pagination: {
      totalCount: totalUsersCount,
      currentPage,
      pageSize,
      setCurrentPage: handlePageChange,
    },
  };
};
