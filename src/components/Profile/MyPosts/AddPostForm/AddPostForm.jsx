import { Field, reduxForm } from 'redux-form'

import s from './AddPostForm.module.css';
import Button from '../../../common/Button/Button';
import { maxLength, required } from '../../../../utils/validators/validators';
import FormControls from '../../../common/FormsControls/FormsControls';

const Textarea = FormControls("textarea");

const SendMessageForm = (props) => {
  return (
    <form className={s.form} onSubmit={props.handleSubmit}>
      <Field
        id="newPostText"
        name="newPostText"
        component={Textarea}
        className={`textarea ${s.form__textarea}`}
        placeholder='Что у вас нового?'
        validate={[required, maxLength(255)]}
      />

      <Button
        text="Отправить"
        className={s.form__submit}
      />
    </form>
  )
}

export default reduxForm({ form: 'add-post' })(SendMessageForm);