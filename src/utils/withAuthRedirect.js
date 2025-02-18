import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsAuth } from '../redux/auth/selectors';

const mapStateToProps = (state) => ({
  isAuth: getIsAuth(state)
});

const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    if (!props.isAuth) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };

  return connect(mapStateToProps)(RedirectComponent);
};

export default withAuthRedirect;
