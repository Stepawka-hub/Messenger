import React from 'react';
import { connect } from 'react-redux';

import { 
  followAC, 
  setUsersAC, 
  unfollowAC, 
  setTotalUsersCountAC, 
  setCurrentPageAC, 
  setLoadingAC, 
  setFollowingProgressAC 
} from '../../redux/usersReducer';
import Users from './Users';

import usersAPI from '../../api/api';

class UsersContainer extends React.Component {
  componentDidMount = () => {
    this.props.setLoading(true);

    usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
      .then((data) => {
        const users = data.items.map((item) =>
        ({
          ...item,
          location: { country: 'Russia', city: 'Moscow' },
        }));

        this.props.setLoading(false);
        this.props.setTotalUsersCount(data.totalCount);
        this.props.setUsers(users);
      })
  }

  setCurrentPage = (pageNumber) => {
    this.props.setLoading(true);
    this.props.setCurrentPage(pageNumber);

    usersAPI.getUsers(pageNumber, this.props.pageSize)
      .then((data) => {
        const users = data.items.map((item) =>
        ({
          ...item,
          location: { country: 'Russia', city: 'Moscow' },
        }));

        this.props.setLoading(false);
        this.props.setUsers(users);
      })
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
        setFollowingProgress={this.props.setFollowingProgress}
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
  followToUser: followAC,
  unfollowFromUser: unfollowAC,
  setUsers: setUsersAC,
  setTotalUsersCount: setTotalUsersCountAC,
  setCurrentPage: setCurrentPageAC,
  setLoading: setLoadingAC,
  setFollowingProgress: setFollowingProgressAC
})(UsersContainer);