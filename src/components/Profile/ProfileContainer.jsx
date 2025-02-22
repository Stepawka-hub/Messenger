/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Profile from './Profile';
import { getProfile, getUserStatus, updateUserStatus } from '../../redux/profile/thunks';
import withRouter from '../../utils/withRouter';
import withAuthRedirect from '../../utils/withAuthRedirect';
import { compose } from 'redux';
import { getProfileSelector, getStatusSelector } from '../../redux/profile/selectors';
import { getCurrentUserId } from '../../redux/auth/selectors';

const ProfileContainer = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector(getProfileSelector);
  const status = useSelector(getStatusSelector);
  const currentUserId = useSelector(getCurrentUserId);

  useEffect(() => {
    const userId = props.router.params.userId || currentUserId;
    dispatch(getProfile(userId));
    dispatch(getUserStatus(userId));
  }, []);

  const updateStatus = (status) => {
    dispatch(updateUserStatus(status));
  }

  return (
    <Profile
      profile={profile}
      status={status}
      updateUserStatus={updateStatus}
    />
  );
}

export default compose(
  withRouter,
  withAuthRedirect
)(ProfileContainer);