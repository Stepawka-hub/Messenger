import React from 'react';
import { connect } from 'react-redux';

import { 
  setCurrentPageAC, 
  unfollowFromUser,
  followToUser,
  getUsers
} from '../../redux/usersReducer';
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
    userList: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    isLoading: state.usersPage.isLoading,
    followingInProgress: state.usersPage.followingInProgress
  }
}

export default connect(mapStateToProps, {
  setCurrentPage: setCurrentPageAC,
  followToUser,
  unfollowFromUser,
  getUsers
})(UsersContainer);