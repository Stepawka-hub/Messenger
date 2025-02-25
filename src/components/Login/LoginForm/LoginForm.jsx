import s from './LoginForm.module.css';
import Button from '../../common/Button/Button';
import { Field, reduxForm } from 'redux-form';
import { FormControl, FormError } from '../../common/FormsControls/FormsControls';
import { required, minLengthValidate } from '../../../utils/validators/validators';

const Input = FormControl('input');
const minLength = minLengthValidate(5);

const LoginForm = ({ handleSubmit, captchaUrl, error }) => {
  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <h2 className={s.form__title}>
          Login
        </h2>

        <Field
          type="text"
          component={Input}
          name="email"
          classField={s.form__field}
          classElement={s.form__input}
          placeholder='Email'
          validate={[required]}
        />

        <Field
          type="password"
          component={Input}
          name="password"
          classField={s.form__field}
          classElement={s.form__input}
          placeholder='Password'
          validate={[required, minLength]}
        />

        {
          captchaUrl &&
          <div className={s.captchaContainer}>
            <Field
              type="text"
              component={Input}
              name="captcha"
              classField={s.form__field}
              classElement={s.form__input}
              placeholder='Captcha'
              validate={[required]}
            />
            <img
              className={s.captcha}
              src={captchaUrl}
              alt='Captcha'
            />
          </div>
        }

        <div className={s.form__remember}>
          <span>Remember me</span>
          <Field
            component="input"
            type="checkbox"
            name="rememberMe"
          />
        </div>

        {error && <FormError error={error} />}

        <Button
          text='Login'
          className={s.form__submit}
        />
      </form>
    </div>
  )
}

export default reduxForm({ form: 'login' })(LoginForm);