import { Field, reduxForm } from 'redux-form';
import s from './SendMessageForm.module.css';
import Button from '../../common/Button/Button';

const SendMessageForm = (props) => {
  return (
    <form className={s.form} onSubmit={props.handleSubmit}>
      <Field
        id="newMessage"
        name="newMessage"
        component="textarea"
        className={`textarea ${s.form__textarea}`}
        placeholder='Введите сообщение...'
      />
      <Button
        text="Отправить"
        className={s.form__submit}
      />
    </form >
  )
}

export default reduxForm({ form: 'send-message' })(SendMessageForm);