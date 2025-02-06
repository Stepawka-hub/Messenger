import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './Header.css';
import Header from './Header';
import { setAuthAC, setLoadingAC, setAuthUserDataAC } from '../../redux/authReducer';
import { API_URL } from '../../utils/constants';

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.setLoading(true);

    axios
      .get(`${API_URL}/auth/me`, {
        withCredentials: true
      })
      .then((response) => {
        if (response.data.resultCode === 0) {
          const { id, login, email } = response.data.data;

          axios
            .get(`${API_URL}/profile/${id}`)
            .then((response) => {
              const photos = response.data.photos;
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