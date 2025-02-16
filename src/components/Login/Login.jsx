import { connect } from 'react-redux';

import './Login.css';
import LoginForm from './LoginForm/LoginForm';
import { loginUser } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';

const Login = (props) => {
  const onSubmit = (formData) => {
    const { email, password, rememberMe } = formData;
    props.loginUser(email, password, rememberMe, true);
  }

  if (props.isAuth) {
    return <Navigate to='/profile' />;
  }

  return (
    <section className='login'>
      <LoginForm onSubmit={onSubmit} />
    </section>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { loginUser })(Login);