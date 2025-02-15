import './Login.css';
import LoginForm from './LoginForm/LoginForm';

const Login = () => {
  const onSubmit = (formData) => {
    console.log(formData);
  }

  return (
    <section className='login'>
      <LoginForm 
        onSubmit={onSubmit}
      />
    </section>
  )
}

export default Login;