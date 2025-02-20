import { connect } from 'react-redux';

import './Login.css';
import LoginForm from './LoginForm/LoginForm';
import { loginUser } from '../../redux/auth/thunks';
import { Navigate } from 'react-router-dom';
import { getIsAuth } from '../../redux/auth/selectors';

const Login = ({isAuth, loginUser}) => {
  const onSubmit = (formData) => {
    const { email, password, rememberMe } = formData;
    loginUser(email, password, rememberMe, true);
  }

  if (isAuth) {
    return <Navigate to='/profile' />;
  }

  return (
    <section className='login'>
      <LoginForm onSubmit={onSubmit} />
    </section>
  )
}

const mapStateToProps = (state) => ({
  isAuth: getIsAuth(state),
});

export default connect(mapStateToProps, { loginUser })(Login);