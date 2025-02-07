import React from 'react';
import { connect } from 'react-redux';

import Profile from './Profile';
import { setUserProfileAC } from '../../redux/profileReducer';
import withRouter from '../../utils/withRouter';
import usersAPI from '../../api/api';

class ProfileContainer extends React.Component {
  componentDidMount() {
    const userId = this.props.router.params.userId || 2;

    usersAPI.getProfile(userId)
      .then((data) => {
        this.props.setUserProfile(data);
      });

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

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
  setUserProfile: setUserProfileAC
})(WithUrlDataContainerComponent);