import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormControl } from '../../../common/FormsControls/FormsControls';
import s from './ProfileEditForm.module.css';
import { isValidUrl, isValueValidate, required } from '../../../../utils/validators/validators';

const Input = FormControl('input');
const isValue = isValueValidate(['Да', 'Нет']);

const ProfileEditForm = React.forwardRef(({ profile, handleSubmit }, ref) => {
  const fields = [
    {
      label: 'Полное имя',
      name: 'fullName',
      validate: [required]
    },
    {
      label: 'Обо мне',
      name: 'aboutMe',
      validate: [required]
    },
    {
      label: 'Ищу работу (Да/Нет)',
      name: 'lookingForAJob',
      validate: [required, isValue]
    },
    {
      label: 'Описание поиска работы',
      name: 'lookingForAJobDescription',
      validate: [required]
    },
    {
      label: 'VK',
      name: 'vk',
      validate: [required, isValidUrl]
    },
    {
      label: 'Facebook',
      name: 'facebook',
      validate: [required, isValidUrl]
    },
    {
      label: 'Twitter',
      name: 'twitter',
      validate: [required, isValidUrl]
    },
    {
      label: 'Instagram',
      name: 'instagram',
      validate: [required, isValidUrl]
    },
    {
      label: 'GitHub',
      name: 'github',
      validate: [required, isValidUrl]
    },
  ];

  return (
    <form className={s.profileData} onSubmit={handleSubmit} ref={ref}>
      <div className={s.formFields}>
        {
          fields.map((field, index) => (
            <div className={s.fieldContainer} key={index}>
              <span className={s.label}>
                {field.label}
              </span>
              <Field
                type="text"
                component={Input}
                name={field.name}
                classField={s.field}
                classElement={s.element}
                placeholder={field.label}
                validate={field.validate}
              />
            </div>
          ))
        }
      </div>
    </form>
  );
});

export default reduxForm({ 
  form: 'profile-edit',
  enableReinitialize : true
})(ProfileEditForm);