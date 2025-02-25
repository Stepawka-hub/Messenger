import s from './FormsControls.module.css'

export const FormControl = (FormElement) => ({ input, meta, classElement, classField, initialValue, ...props }) => {
  const hasError = meta.touched && meta.error;
  const invalidClass = hasError ? s.element_invalid : '';

  return (
    <div className={`${s.container} ${classField || ''}`}>
      <FormElement
        {...input}
        {...props}
        className={`${classElement || ''} ${invalidClass}`}
      />
      {
        hasError &&
        <span className={s.element__error}>
          {meta.error}
        </span>
      }
    </div>
  );
};

export const FormError = ({ error }) => {
  return (
    <span className={s['form-error-text']}>
      {error}
    </span>
  );
}