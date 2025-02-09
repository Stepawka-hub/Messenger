import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Profile from './Profile';
import { getProfile } from '../../redux/profileReducer';
import withRouter from '../../utils/withRouter';

class ProfileContainer extends React.Component {
  componentDidMount() {
    const userId = this.props.router.params.userId || 2;
    this.props.getProfile(userId);
  }

  render = () => {
    if (!this.props.isAuth) {
      return <Navigate to="/login" />;
    }

    return (
      <Profile {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
  }
}

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getProfile })(WithUrlDataContainerComponent);