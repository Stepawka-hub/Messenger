import { connect } from 'react-redux';

import './Login.css';
import LoginForm from './LoginForm/LoginForm';
import { loginUser } from '../../redux/authReducer';

const Login = (props) => {
  const onSubmit = (formData) => {
    const { email, password, rememberMe } = formData;
    props.loginUser(email, password, rememberMe, true);
  }

  return (
    <section className='login'>
      <LoginForm onSubmit={onSubmit} />
    </section>
  )
}

const mapStateToProps = () => {
  return {

  }
}

export default connect(mapStateToProps, { loginUser })(Login);