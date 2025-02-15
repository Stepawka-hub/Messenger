import s from './LoginForm.module.css';
import Button from '../../common/Button/Button';
import { Field, reduxForm } from 'redux-form';

const LoginForm = (props) => {
  return (
    <div>
      <form className={s.form} onSubmit={props.handleSubmit}>
        <h2 className={s.form__title}>Login</h2>

        <Field
          type="text"
          component="input"
          name="email"
          className={s.form__input}
          placeholder='Email'
        />

        <Field
          type="text"
          component="input"
          name="password"
          className={s.form__input}
          placeholder='Password'
        />

        <div className={s.form__remember}>
          <span>Remember me</span>
          <Field
            component="input"
            type="checkbox"
            name="rememberMe"
          />
        </div>

        <Button
          text='Login'
          className={s.form__submit}
        />
      </form>
    </div>
  )
}

export default reduxForm({ form: 'login' })(LoginForm);