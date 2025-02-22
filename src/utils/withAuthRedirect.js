import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsAuth } from '../redux/auth/selectors';

const withAuthRedirect = (Component) => {
  const RedirectContainer = (props) => {
    const isAuth = useSelector(getIsAuth);

    if (!isAuth) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };

  return RedirectContainer;
};

export default withAuthRedirect;