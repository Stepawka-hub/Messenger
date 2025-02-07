import React from 'react';
import { connect } from 'react-redux';

import './Header.css';
import Header from './Header';
import { setAuthAC, setLoadingAC, setAuthUserDataAC } from '../../redux/authReducer';
import usersAPI from '../../api/api';

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.setLoading(true);

    usersAPI.authMe()
      .then((data) => {
        if (data.resultCode === 0) {
          const { id, login, email } = data.data;

          usersAPI.getProfile(id)
            .then((data) => {
              const photos = data.photos;
              this.props.setAuthUserData(id, login, email, photos);
              this.props.setAuth(true);
            })
        }

        this.props.setLoading(false);
      });
  }

  render = () => {
    return (
      <Header {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
    email: state.auth.email,
    isLoading: state.auth.isLoading,
    isAuth: state.auth.isAuth
  }
}

export default connect(mapStateToProps, {
  setAuthUserData: setAuthUserDataAC,
  setLoading: setLoadingAC,
  setAuth: setAuthAC
})(HeaderContainer);