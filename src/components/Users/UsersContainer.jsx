import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getCurrentPage,
  getFollowingInProgress,
  getIsLoading,
  getPageSize,
  getTotalUsersCount,
  getUserList
} from '../../redux/users/selectors';
import { setCurrentPageAC } from '../../redux/users/actions';
import { getUsers, followToUser, unfollowFromUser } from '../../redux/users/thunks';
import withAuthRedirect from '../../utils/withAuthRedirect';

import Users from './Users';

const UsersContainer = () => {
  const dispatch = useDispatch();

  const userList = useSelector(getUserList);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const isLoading = useSelector(getIsLoading);
  const followingInProgress = useSelector(getFollowingInProgress);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const setCurrentPage = (pageNumber) => {
    dispatch(setCurrentPageAC(pageNumber));
  }

  const follow = (userId) => {
    dispatch(followToUser(userId));
  }

  const unfollow = (userId) => {
    dispatch(unfollowFromUser(userId))
  }

  return (
    <Users
      userList={userList}
      totalUsersCount={totalUsersCount}
      pageSize={pageSize}
      currentPage={currentPage}
      followingInProgress={followingInProgress}
      isLoading={isLoading}

      followToUser={follow}
      unfollowFromUser={unfollow}
      setCurrentPage={setCurrentPage}
    />
  );
}

export default withAuthRedirect(UsersContainer);