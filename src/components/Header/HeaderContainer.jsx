import React from 'react';
import { connect } from 'react-redux';

import './Header.css';
import Header from './Header';
import { getAuthUserData, logoutUser } from '../../redux/authReducer';

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthUserData();
  }

  render() {
    return (
      <Header {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.auth.login,
  email: state.auth.email,
  isLoading: state.auth.isLoading,
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { getAuthUserData, logoutUser })(HeaderContainer);