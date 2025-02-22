import { Field, reduxForm } from 'redux-form'

import s from './AddPostForm.module.css';
import Button from '../../../common/Button/Button';
import { maxLengthValidate, required } from '../../../../utils/validators/validators';
import { FormControl } from '../../../common/FormsControls/FormsControls';

const Textarea = FormControl("textarea");
const maxLength = maxLengthValidate(255);

const AddPostForm = ({handleSubmit}) => {
  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <Field
        id="newPostText"
        name="newPostText"
        component={Textarea}
        classElement={`textarea ${s.form__textarea}`}
        placeholder='Что у вас нового?'
        validate={[required, maxLength]}
      />

      <Button
        text="Отправить"
        className={s.form__submit}
      />
    </form>
  )
}

export default reduxForm({ form: 'add-post' })(AddPostForm);