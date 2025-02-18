import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

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

class UsersContainer extends React.Component {
  componentDidMount = () => {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  setCurrentPage = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
    this.props.setCurrentPage(pageNumber);
  }

  render = () => {
    return (
      <Users
        userList={this.props.userList}
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        followingInProgress={this.props.followingInProgress}

        followToUser={this.props.followToUser}
        unfollowFromUser={this.props.unfollowFromUser}
        setCurrentPage={this.setCurrentPage}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: getUserList(state),
    totalUsersCount: getTotalUsersCount(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    isLoading: getIsLoading(state),
    followingInProgress: getFollowingInProgress(state)
  }
}

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    setCurrentPage: setCurrentPageAC,
    followToUser,
    unfollowFromUser,
    getUsers
  })
)(UsersContainer);