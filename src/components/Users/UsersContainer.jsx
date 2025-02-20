import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect, useSelector, useDispatch } from 'react-redux';

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

const UsersContainer = (props) => {
  const dispatch = useDispatch();

  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const setCurrentPage = (pageNumber) => {
    props.setCurrentPage(pageNumber);
  };

  return (
    <Users
      userList={props.userList}
      totalUsersCount={props.totalUsersCount}
      pageSize={pageSize}
      currentPage={currentPage}
      followingInProgress={props.followingInProgress}

      followToUser={props.followToUser}
      unfollowFromUser={props.unfollowFromUser}
      setCurrentPage={setCurrentPage}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    userList: getUserList(state),
    totalUsersCount: getTotalUsersCount(state),
    isLoading: getIsLoading(state),
    followingInProgress: getFollowingInProgress(state)
  }
}

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    setCurrentPage: setCurrentPageAC,
    followToUser,
    unfollowFromUser
  })
)(UsersContainer);