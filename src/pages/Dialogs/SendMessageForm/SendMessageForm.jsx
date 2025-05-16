import { Field, reduxForm } from 'redux-form';
import s from './SendMessageForm.module.css';
import Button from '../../../components/common/Button/Button';
import { FormControl } from '../../../components/common/FormsControls/FormsControls';
import { maxLengthValidate, required } from '../../../utils/validators/validators';

const Textarea = FormControl("textarea");
const maxLength = maxLengthValidate(1024);

const SendMessageForm = ({handleSubmit}) => {
  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <Field
        id="newMessageText"
        name="newMessageText"
        component={Textarea}
        classElement={`textarea ${s.form__textarea}`}
        placeholder='Введите сообщение...'
        validate={[required, maxLength]}
      />
      <Button
        text="Отправить"
        className={s.form__submit}
      />
    </form >
  )
}

export default reduxForm({ form: 'send-message' })(SendMessageForm);