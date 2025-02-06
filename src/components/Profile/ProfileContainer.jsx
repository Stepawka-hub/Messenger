import React from 'react';
import Profile from './Profile';

import { API_URL } from '../../utils/constants';
import { setUserProfileAC } from '../../redux/profileReducer';

import axios from 'axios';
import { connect } from 'react-redux';
import withRouter from '../../utils/withRouter';

class ProfileContainer extends React.Component {
  componentDidMount() {
    const userId = this.props.router.params.userId || 2;

    axios
      .get(`${API_URL}/profile/${userId}`)
      .then((response) => {
        this.props.setUserProfile(response.data);
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