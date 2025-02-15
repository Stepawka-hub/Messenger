import s from './LoginForm.module.css';
import Button from '../../common/Button/Button';
import { Field, reduxForm } from 'redux-form';
import FormControls  from '../../common/FormsControls/FormsControls';
import { required, minLength } from '../../../utils/validators/validators';

const Input = FormControls('input');

const LoginForm = (props) => {
  return (
    <div>
      <form className={s.form} onSubmit={props.handleSubmit}>
        <h2 className={s.form__title}>Login</h2>

        <Field
          type="text"
          component={Input}
          name="email"
          className={s.form__input}
          placeholder='Email'
          validate={[required]}
        />

        <Field
          type="text"
          component={Input}
          name="password"
          className={s.form__input}
          placeholder='Password'
          validate={[required, minLength(5)]}
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