import { useDispatch, useSelector } from 'react-redux';

import './Login.css';
import LoginForm from './LoginForm/LoginForm';
import { loginUser } from '../../redux/auth/thunks';
import { Navigate } from 'react-router-dom';
import { getIsAuth } from '../../redux/auth/selectors';

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);

  const onSubmit = (formData) => {
    const { email, password, rememberMe } = formData;
    dispatch(loginUser(email, password, rememberMe, true));
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

export default Login;