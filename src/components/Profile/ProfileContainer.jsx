import React from 'react';
import { connect } from 'react-redux';

import Profile from './Profile';
import { getProfile, getUserStatus, updateUserStatus } from '../../redux/profile/thunks';
import withRouter from '../../utils/withRouter';
import withAuthRedirect from '../../utils/withAuthRedirect';
import { compose } from 'redux';
import { getProfileSelector, getStatusSelector } from '../../redux/profile/selectors';
import { getCurrentUserId } from '../../redux/auth/selectors';

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

const mapStateToProps = (state) => ({
  profile: getProfileSelector(state),
  status: getStatusSelector(state),
  currentUserId: getCurrentUserId(state),
});

export default compose(
  connect(mapStateToProps, {getProfile, getUserStatus, updateUserStatus}),
  withRouter,
  withAuthRedirect
)(ProfileContainer);