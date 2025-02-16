import { Field, reduxForm } from 'redux-form';
import s from './SendMessageForm.module.css';
import Button from '../../common/Button/Button';
import { FormControl } from '../../common/FormsControls/FormsControls';
import { maxLength, required } from '../../../utils/validators/validators';

const Textarea = FormControl("textarea");

const SendMessageForm = (props) => {
  return (
    <form className={s.form} onSubmit={props.handleSubmit}>
      <Field
        id="newMessageText"
        name="newMessageText"
        component={Textarea}
        className={`textarea ${s.form__textarea}`}
        placeholder='Введите сообщение...'
        validate={[required, maxLength(1024)]}
      />
      <Button
        text="Отправить"
        className={s.form__submit}
      />
    </form >
  )
}

export default reduxForm({ form: 'send-message' })(SendMessageForm);