/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Profile from './Profile';
import { getProfile, getUserStatus, updateUserStatus } from '../../redux/profile/thunks';
import withRouter from '../../utils/withRouter';
import withAuthRedirect from '../../utils/withAuthRedirect';
import { compose } from 'redux';
import { getProfileSelector, getStatusSelector } from '../../redux/profile/selectors';
import { getCurrentUserId } from '../../redux/auth/selectors';

const ProfileContainer = (props) => {
  useEffect(() => {
    const userId = props.router.params.userId || props.currentUserId;
    props.getProfile(userId);
    props.getUserStatus(userId);
  }, []);

  return (
    <Profile
      profile={props.profile}
      status={props.status}
      updateUserStatus={props.updateUserStatus}
    />
  );
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