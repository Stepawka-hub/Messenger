import React from 'react';
import { connect } from 'react-redux';

import Profile from './Profile';
import { getProfile } from '../../redux/profileReducer';
import withRouter from '../../utils/withRouter';

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

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getProfile })(WithUrlDataContainerComponent);