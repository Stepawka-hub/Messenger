import React from 'react';
import { connect } from 'react-redux';

import Profile from './Profile';
import { getProfile } from '../../redux/profileReducer';
import withRouter from '../../utils/withRouter';
import withAuthRedirect from '../../utils/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
  componentDidMount() {
    const userId = this.props.router.params.userId || 2;
    this.props.getProfile(userId);
  }

  render = () => {
    return (
      <Profile {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile
  }
}

export default compose(
  connect(mapStateToProps, {getProfile}),
  withRouter,
  withAuthRedirect
)(ProfileContainer);