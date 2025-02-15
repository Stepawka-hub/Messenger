import s from './FormsControls.module.css'

const FormControl = (FormElement) => ({ input, meta, className, ...props }) => {
  const hasError = meta.touched && meta.error;
  const invalidClass = hasError ? s.element_invalid : '';

  return (
    <div className={s.container}>
      <FormElement
        {...input}
        {...props}
        className={`${className} ${invalidClass}`}
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

export default FormControl;