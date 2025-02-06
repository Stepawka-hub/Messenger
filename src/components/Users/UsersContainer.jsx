import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { followAC, setUsersAC, unfollowAC, setTotalUsersCountAC, setCurrentPageAC, setLoadingAC } from '../../redux/usersReducer';
import { API_URL } from '../../utils/constants'
import Users from './Users';

class UsersContainer extends React.Component {
  componentDidMount = () => {
    this.props.setLoading(true);
    axios
      .get(`${API_URL}/users?page=${this.props.currentPage}&count=${this.props.pageSize}`, {
        withCredentials: true
      })
      .then((response) => {
        const users = response.data.items.map((item) =>
        ({
          ...item,
          location: { country: 'Russia', city: 'Moscow' },
        }));

        this.props.setLoading(false);
        this.props.setTotalUsersCount(response.data.totalCount);
        this.props.setUsers(users);
      })
  }

  setCurrentPage = (pageNumber) => {
    this.props.setLoading(true);
    this.props.setCurrentPage(pageNumber);

    axios
      .get(`${API_URL}/users?page=${pageNumber}&count=${this.props.pageSize}`, {
        withCredentials: true
      })
      .then((response) => {
        const users = response.data.items.map((item) =>
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
    isLoading: state.usersPage.isLoading
  }
}

export default connect(mapStateToProps, {
  followToUser: followAC,
  unfollowFromUser: unfollowAC,
  setUsers: setUsersAC,
  setTotalUsersCount: setTotalUsersCountAC,
  setCurrentPage: setCurrentPageAC,
  setLoading: setLoadingAC
})(UsersContainer);