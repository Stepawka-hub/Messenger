/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';

import './Login.css';
import LoginForm from './LoginForm/LoginForm';
import { getCaptcha, loginUser } from '../../redux/auth/thunks';
import { Navigate } from 'react-router-dom';
import { getCaptchaUrl, getIsAuth } from '../../redux/auth/selectors';
import { useEffect } from 'react';
import useTitle from '../../hooks/useTitle';

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const captchaUrl = useSelector(getCaptchaUrl);

  useTitle('Login');

  useEffect(() => {
    dispatch(getCaptcha());
  }, [])

  if (isAuth) return <Navigate to='/profile' />;

  const onSubmit = (formData) => {
    const { email, password, rememberMe, captcha } = formData;
    dispatch(loginUser(email, password, rememberMe, captcha));
  }

  return (
    <section className='login'>
      <LoginForm 
        captchaUrl={captchaUrl}
        onSubmit={onSubmit} 
      />
    </section>
  )
}

export default Login;