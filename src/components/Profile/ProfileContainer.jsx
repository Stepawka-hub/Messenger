import React from 'react';
import { connect } from 'react-redux';

import Profile from './Profile';
import { getProfile, getUserStatus, updateUserStatus } from '../../redux/reducers/profileReducer';
import withRouter from '../../utils/withRouter';
import withAuthRedirect from '../../utils/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
  componentDidMount() {
    const userId = this.props.router.params.userId || this.props.currentUserId;
    this.props.getProfile(userId);
    this.props.getUserStatus(userId);
  }

  render = () => {
    return (
      <Profile
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    currentUserId: state.auth.id,
  }
}

export default compose(
  connect(mapStateToProps, {getProfile, getUserStatus, updateUserStatus}),
  withRouter,
  withAuthRedirect
)(ProfileContainer);