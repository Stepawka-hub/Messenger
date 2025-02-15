import { Field, reduxForm } from 'redux-form'

import s from './AddPostForm.module.css';
import Button from '../../../common/Button/Button';

const SendMessageForm = (props) => {
  return (
    <form className={s.form} onSubmit={props.handleSubmit}>
      <Field
        id="newPost"
        name="newPost"
        component="textarea"
        className={`textarea ${s.form__textarea}`}
        placeholder='Что у вас нового?'
      />

      <Button
        text="Отправить"
        className={s.form__submit}
      />
    </form>
  )
}

export default reduxForm({ form: 'add-post' })(SendMessageForm);